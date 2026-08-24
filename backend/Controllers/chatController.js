import Message from "../models/MessageSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Hospital from "../models/HospitalSchema.js";

// Helper to get all equivalent IDs for a user/hospital
const getEquivalentIds = async (id) => {
  if (!id) return [];
  const idStr = id.toString();
  const ids = [idStr];
  try {
    // Check if id is a User._id that owns a Hospital
    const hospitalByUser = await Hospital.findOne({ user: idStr });
    if (hospitalByUser) {
      ids.push(hospitalByUser._id.toString());
    }
    // Check if id is a Hospital._id that has a user
    const hospitalById = await Hospital.findById(idStr);
    if (hospitalById && hospitalById.user) {
      ids.push(hospitalById.user.toString());
    }
  } catch (e) {
    // fallback with original id
  }
  return [...new Set(ids)];
};

// POST /api/v1/chat/send
export const sendMessage = async (req, res) => {
  const { recipientId, recipientModel, message, attachment, attachmentType, bookingId } = req.body;
  const senderId = req.userId;
  let senderModel = "User";
  if (req.role === "doctor") senderModel = "Doctor";
  if (req.role === "hospital") senderModel = "Hospital";

  const io = req.app.get("io");

  try {
    if (!message && !attachment) {
      return res.status(400).json({ success: false, message: "Message content or attachment is required." });
    }

    let finalRecipientId = recipientId;
    if ((!finalRecipientId || finalRecipientId === "undefined") && bookingId) {
      const Booking = (await import("../models/BookingSchema.js")).default;
      const b = await Booking.findById(bookingId);
      if (b) {
        finalRecipientId = (req.role === "user" || req.role === "patient") ? (b.hospital || b.doctor) : b.user;
      }
    }

    if (!finalRecipientId || finalRecipientId === "undefined") {
      return res.status(400).json({ success: false, message: "Recipient ID is required to send message." });
    }

    const newMessage = new Message({
      sender: senderId,
      senderModel,
      recipient: finalRecipientId,
      recipientModel: recipientModel || "User",
      booking: bookingId || undefined,
      message: message || "",
      attachment: attachment || "",
      attachmentType: attachmentType || "",
    });

    await newMessage.save();

    // Populate sender info for real-time emit
    const populated = await Message.findById(newMessage._id)
      .populate("sender", "name photo")
      .populate("recipient", "name photo");

    // Emit Socket Event to Recipient's Room and Sender's Room
    if (io) {
      const recipientIds = await getEquivalentIds(recipientId);
      const senderIds = await getEquivalentIds(senderId);

      recipientIds.forEach(rId => io.to(rId).emit("NEW_MESSAGE", populated));
      senderIds.forEach(sId => io.to(sId).emit("NEW_MESSAGE", populated));
      io.emit("GLOBAL_NEW_MESSAGE", populated);
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: populated,
    });
  } catch (err) {
    console.error("Chat sendMessage error:", err);
    res.status(500).json({ success: false, message: "Failed to send message: " + err.message });
  }
};

// GET /api/v1/chat/conversation/:otherId
export const getConversation = async (req, res) => {
  const { otherId } = req.params;
  const userId = req.userId;

  try {
    const myIds = await getEquivalentIds(userId);
    const otherIds = await getEquivalentIds(otherId);

    const messages = await Message.find({
      $or: [
        { sender: { $in: myIds }, recipient: { $in: otherIds } },
        { sender: { $in: otherIds }, recipient: { $in: myIds } },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name photo role")
      .populate("recipient", "name photo role");

    // Mark received unread messages as read
    await Message.updateMany(
      { sender: { $in: otherIds }, recipient: { $in: myIds }, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    console.error("Chat getConversation error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch conversation: " + err.message });
  }
};

// GET /api/v1/chat/contacts
export const getChatContacts = async (req, res) => {
  const userId = req.userId;
  const myIds = await getEquivalentIds(userId);

  try {
    // Find all distinct senders/recipients for this user/hospital
    const messages = await Message.find({
      $or: [{ sender: { $in: myIds } }, { recipient: { $in: myIds } }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name photo specialization")
      .populate("recipient", "name photo specialization");

    const contactsMap = new Map();

    messages.forEach(msg => {
      const isSender = myIds.includes(msg.sender?._id?.toString());
      const partner = isSender ? msg.recipient : msg.sender;

      if (partner && partner._id && !contactsMap.has(partner._id.toString())) {
        contactsMap.set(partner._id.toString(), {
          partner,
          lastMessage: msg.message || (msg.attachment ? "📎 Attachment" : ""),
          lastTime: msg.createdAt,
          isRead: isSender ? true : msg.isRead,
        });
      }
    });

    res.status(200).json({
      success: true,
      data: Array.from(contactsMap.values()),
    });
  } catch (err) {
    console.error("Chat getChatContacts error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch contacts: " + err.message });
  }
};
