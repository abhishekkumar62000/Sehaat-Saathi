import React, { useState, useEffect, useRef, useContext } from "react";
import { useSocket } from "../../context/SocketContext";
import { authContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  BsSendFill,
  BsPaperclip,
  BsX,
  BsCheck2All,
  BsPersonCircle,
  BsChatDotsFill,
  BsFileEarmarkMedical,
  BsImage
} from "react-icons/bs";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const LiveChatDrawer = ({ partner, bookingId, onClose }) => {
  const { user, token } = useContext(authContext);
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const partnerId = partner?._id || partner?.id;
  const partnerName = partner?.name || partner?.patientName || "User";
  const partnerPhoto = partner?.photo;
  const partnerRole = partner?.role || (partner?.specialization ? "Doctor" : "Patient");

  // Fetch Conversation History
  useEffect(() => {
    if (!partnerId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/chat/conversation/${partnerId}`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (res.ok && result.data) {
          setMessages(result.data);
        }
      } catch (err) {
        console.error("Fetch conversation failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [partnerId, token]);

  // Real-Time Socket Listener for incoming messages
  useEffect(() => {
    if (!socket) return;

    const onNewMessage = (newMsg) => {
      // Check if message belongs to current partner conversation
      const msgSenderId = newMsg.sender?._id || newMsg.sender;
      if (msgSenderId === partnerId || newMsg.recipient === partnerId) {
        setMessages(prev => [...prev, newMsg]);
      } else {
        toast.info(`💬 New message from ${newMsg.sender?.name || "Patient"}`);
      }
    };

    socket.on("NEW_MESSAGE", onNewMessage);
    return () => socket.off("NEW_MESSAGE", onNewMessage);
  }, [socket, partnerId]);

  // Fallback Polling (crucial for Vercel Serverless where WebSockets might fail)
  useEffect(() => {
    if (!partnerId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/conversation/${partnerId}`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (res.ok && result.data) {
          setMessages(prev => {
            // Only update if there is a new message to prevent unwanted re-renders
            if (prev.length !== result.data.length) {
              return result.data;
            }
            return prev;
          });
        }
      } catch (err) {
        // silent fail for background polling
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [partnerId, token]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle File Attachment Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setAttachment({
        url: data.url,
        type: file.type.startsWith("image/") ? "image" : "file",
        name: file.name,
      });
      toast.success("Attachment ready to send!");
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachment) return;

    const recipientModel = user?.role === "doctor" ? "User" : "Doctor";
    const payload = {
      recipientId: partnerId,
      recipientModel,
      message: inputText.trim(),
      attachment: attachment?.url || "",
      attachmentType: attachment?.type || "",
      bookingId: bookingId || undefined,
    };

    // Optimistic UI append
    const tempMsg = {
      _id: Date.now().toString(),
      sender: { _id: user._id || user.id, name: user.name, photo: user.photo },
      message: inputText.trim(),
      attachment: attachment?.url || "",
      attachmentType: attachment?.type || "",
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, tempMsg]);
    setInputText("");
    setAttachment(null);

    try {
      const res = await fetch(`${BASE_URL}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
    } catch (err) {
      toast.error("Failed to send message: " + err.message);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[3000] w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-5 py-4 flex items-center justify-between flex-shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <figure className="w-10 h-10 rounded-full border-2 border-indigo-400/40 overflow-hidden bg-slate-800 flex-shrink-0">
            <img
              src={partnerPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=6366f1&color=fff`}
              alt=""
              className="w-full h-full object-cover"
            />
          </figure>
          <div>
            <h3 className="font-black text-sm text-white leading-tight flex items-center gap-1.5">
              {partnerName}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-[11px] text-indigo-300 font-medium">
              {partnerRole} • Live Consultation Chat
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-300 hover:text-white"
        >
          <BsX className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Container (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {loading ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold">
            Loading consultation chat history...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 px-4 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 text-2xl">
              <BsChatDotsFill />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">No messages yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Start your secure consultation chat with {partnerName}. Send notes, lab reports, or questions.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = (msg.sender?._id || msg.sender) === (user._id || user.id);
            return (
              <div
                key={msg._id || i}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-sm leading-relaxed ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  }`}
                >
                  {/* Attachment View */}
                  {msg.attachment && (
                    <div className="mb-2">
                      {msg.attachmentType === "image" ? (
                        <a href={msg.attachment} target="_blank" rel="noreferrer">
                          <img
                            src={msg.attachment}
                            alt="Attachment"
                            className="rounded-xl max-h-48 w-full object-cover border border-white/20 hover:opacity-90 transition-opacity"
                          />
                        </a>
                      ) : (
                        <a
                          href={msg.attachment}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 p-2 bg-black/10 rounded-xl text-[11px] font-bold underline"
                        >
                          <BsFileEarmarkMedical className="text-base" /> Medical Report / Document
                        </a>
                      )}
                    </div>
                  )}

                  {msg.message && <p>{msg.message}</p>}

                  <div className={`text-[9px] mt-1 text-right font-mono ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Preview Box */}
      {attachment && (
        <div className="bg-indigo-50 border-t border-indigo-100 p-2.5 px-4 flex items-center justify-between text-xs">
          <span className="font-bold text-indigo-700 truncate max-w-[250px] flex items-center gap-1.5">
            <BsImage /> Attached: {attachment.name}
          </span>
          <button onClick={() => setAttachment(null)} className="text-red-500 hover:text-red-700 font-bold">
            Remove
          </button>
        </div>
      )}

      {/* Footer Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 flex-shrink-0">
        <label className={`p-2.5 rounded-xl cursor-pointer transition-all ${uploading ? "bg-slate-100 animate-pulse text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}>
          <BsPaperclip className="text-base" />
          <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" accept="image/*,.pdf" />
        </label>

        <input
          type="text"
          placeholder={`Message ${partnerName}...`}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !attachment}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-40"
        >
          <BsSendFill className="text-sm" />
        </button>
      </form>
    </div>
  );
};

export default LiveChatDrawer;
