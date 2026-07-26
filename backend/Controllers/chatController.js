import Message from "../models/MessageSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// POST /api/v1/chat/send
export const sendMessage = async (req, res) => {
  const { recipientId, recipientModel, message, attachment, attachmentType, bookingId } = req.body;
  const senderId = req.userId;
  const senderModel = req.role === "doctor" ? "Doctor" : "User";
  const io = req.app.get("io");

  try {
    if (!message && !attachment) {
      return res.status(400).json({ success: false, message: "Message content or attachment is required." });
    }

    const newMessage = new Message({
      sender: senderId,
      senderModel,
      recipient: recipientId,
      recipientModel,
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

    // Emit Socket Event to Recipient's Room
    if (io) {
      io.to(recipientId.toString()).emit("NEW_MESSAGE", populated);
      console.log(`Socket emitted NEW_MESSAGE to room: ${recipientId}`);
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
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: otherId },
        { sender: otherId, recipient: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name photo role")
      .populate("recipient", "name photo role");

    // Mark received unread messages as read
    await Message.updateMany(
      { sender: otherId, recipient: userId, isRead: false },
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
  const isDoctor = req.role === "doctor";

  try {
    // Find all distinct senders/recipients for this user
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name photo specialization")
      .populate("recipient", "name photo specialization");

    const contactsMap = new Map();

    messages.forEach(msg => {
      const isSender = msg.sender?._id?.toString() === userId;
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
