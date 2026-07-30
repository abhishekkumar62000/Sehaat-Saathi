import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { BsVolumeUpFill } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";

// Lobby Screen — meant to be opened full screen on a clinic TV/tablet
const OPDLobbyDisplay = () => {
  const { doctorId } = useParams();
  const { socket } = useSocket();
  const [currentToken, setCurrentToken] = useState(null);
  const [roomName, setRoomName] = useState("Consultation Room");
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(new Date());
  const bellAudioRef = useRef(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Join lobby room + listen for token announcements
  useEffect(() => {
    if (!socket || !doctorId) return;
    socket.emit("JOIN_LOBBY", doctorId);

    const onAnnounce = ({ token, roomName: room }) => {
      setCurrentToken(token);
      if (room) setRoomName(room);
      setHistory(prev => [{ token, room, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);

      // Text-to-speech announcement
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          `Attention please. Calling token number ${token}. Token number ${token}, please proceed to ${room || "the consultation room"}.`
        );
        utterance.lang = "en-IN";
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    };

    socket.on("LOBBY_ANNOUNCE", onAnnounce);
    return () => socket.off("LOBBY_ANNOUNCE", onAnnounce);
  }, [socket, doctorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <MdHealthAndSafety className="text-3xl text-emerald-400" />
          <div>
            <div className="font-black text-xl tracking-tight">SEHAAT SAATHI</div>
            <div className="text-indigo-300 text-xs uppercase tracking-widest">OPD Token Display System</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white tabular-nums">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
          <div className="text-indigo-300 text-xs">
            {time.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Main token display */}
      <div className="flex-grow flex flex-col items-center justify-center gap-8 p-8">
        {/* Doctor badge */}
        <div className="bg-white/10 backdrop-blur rounded-3xl px-8 py-4 flex items-center gap-4 border border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/30 flex items-center justify-center text-2xl">👨‍⚕️</div>
          <div>
            <div className="font-black text-xl">Sehaat Saathi OPD</div>
            <div className="text-indigo-300 text-sm">Live Token Display — Clinic Reception Screen</div>
          </div>
        </div>

        {/* NOW CALLING big display */}
        <div className="text-center">
          <div className="text-indigo-300 text-sm uppercase tracking-[0.3em] font-bold mb-3 animate-pulse">
            ━━ NOW CALLING ━━
          </div>
          <div className={`transition-all duration-700 ${currentToken ? "opacity-100 scale-100" : "opacity-30 scale-90"}`}>
            <div className="text-[8rem] font-black text-yellow-400 leading-none tabular-nums drop-shadow-2xl">
              {currentToken !== null ? `#${currentToken}` : "---"}
            </div>
          </div>
          <div className="text-white/60 text-lg mt-2 font-medium">{roomName}</div>
        </div>

        {/* Instruction */}
        <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl px-6 py-3 text-emerald-300 text-sm font-bold flex items-center gap-2">
          <BsVolumeUpFill className="text-xl" />
          Token holder, please proceed to {roomName} immediately.
        </div>
      </div>

      {/* Recent calls history */}
      {history.length > 0 && (
        <div className="px-8 py-4 border-t border-white/10">
          <div className="text-indigo-300 text-xs uppercase tracking-widest mb-2 font-bold">Recent Calls</div>
          <div className="flex gap-3 flex-wrap">
            {history.map((h, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${i === 0 ? "bg-yellow-400 text-slate-900" : "bg-white/10 text-white/60"}`}>
                #{h.token} — {h.time}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Powered by footer */}
      <div className="text-center py-3 text-white/20 text-xs tracking-widest uppercase">
        Powered by Sehaat Saathi Healthcare Network
      </div>
    </div>
  );
};

export default OPDLobbyDisplay;
