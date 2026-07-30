import React, { useRef, useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { BsEraserFill, BsTrashFill, BsActivity, BsPaletteFill, BsHeartFill, BsImage } from "react-icons/bs";

const DIAGRAMS = {
  none: { name: "Blank Slate", svg: null },
  cardio: {
    name: "Cardiovascular System",
    svg: (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none p-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M50 20 C 35 5, 20 20, 20 35 C 20 55, 50 80, 50 85 C 50 80, 80 55, 80 35 C 80 20, 65 5, 50 20 Z" />
        <path d="M50 20 L50 85 M20 35 C 35 45, 50 35, 50 35 C 50 35, 65 45, 80 35" strokeDasharray="2 2" />
        <circle cx="50" cy="35" r="10" />
        <circle cx="35" cy="55" r="4" />
        <circle cx="65" cy="55" r="4" />
      </svg>
    )
  },
  respiratory: {
    name: "Respiratory (Lungs)",
    svg: (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none p-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Trachea */}
        <path d="M50 15 L50 40" strokeWidth="2" />
        {/* Left Lung */}
        <path d="M50 40 C 45 40, 30 45, 30 65 C 30 80, 48 80, 50 75" />
        {/* Right Lung */}
        <path d="M50 40 C 55 40, 70 45, 70 65 C 70 80, 52 80, 50 75" />
        {/* Rib outline */}
        <path d="M25 50 C 25 30, 75 30, 75 50 C 75 75, 25 75, 25 50" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
    )
  },
  skeletal: {
    name: "Skeletal Joint (Knee/Elbow)",
    svg: (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none p-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Upper Bone */}
        <rect x="45" y="10" width="10" height="35" rx="4" />
        {/* Lower Bone */}
        <rect x="45" y="55" width="10" height="35" rx="4" />
        {/* Joint Capsule */}
        <circle cx="50" cy="50" r="12" strokeDasharray="2 2" />
        <path d="M38 50 L62 50" />
      </svg>
    )
  }
};

const SharedConsultationCanvas = ({ bookingId, isDoctor = false }) => {
  const { socket } = useSocket();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ef4444"); // default red
  const [lineWidth, setLineWidth] = useState(3);
  const [selectedDiagram, setSelectedDiagram] = useState("none");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Support high DPI screens
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    // Join room
    if (socket) {
      socket.emit("JOIN_CANVAS", bookingId);
      
      const handleDrawSync = (drawData) => {
        const { lastX, lastY, x, y, color: drawColor, width } = drawData;
        const ctx = contextRef.current;
        if (!ctx) return;
        
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
      };

      const handleClearSync = () => {
        const ctx = contextRef.current;
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      socket.on("CANVAS_DRAW_SYNC", handleDrawSync);
      socket.on("CANVAS_CLEAR_SYNC", handleClearSync);

      return () => {
        socket.off("CANVAS_DRAW_SYNC", handleDrawSync);
        socket.off("CANVAS_CLEAR_SYNC", handleClearSync);
      };
    }
  }, [socket, bookingId]);

  // Track last coordinates
  const lastX = useRef(0);
  const lastY = useRef(0);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Touch event check
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    // Mouse event fallback
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (e.cancelable) e.preventDefault();
    const eventObj = e.touches ? e : e.nativeEvent;
    const { x, y } = getCoordinates(eventObj);

    lastX.current = x;
    lastY.current = y;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const eventObj = e.touches ? e : e.nativeEvent;
    const { x, y } = getCoordinates(eventObj);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    // Emit event to peer
    if (socket) {
      socket.emit("CANVAS_DRAW", {
        bookingId,
        drawData: {
          lastX: lastX.current,
          lastY: lastY.current,
          x,
          y,
          color,
          width: lineWidth
        }
      });
    }

    lastX.current = x;
    lastY.current = y;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (socket) {
      socket.emit("CANVAS_CLEAR", bookingId);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col gap-4 text-white overflow-hidden">
      {/* Decorative pulse glow */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>

      <div className="flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/30">
            <BsActivity className="animate-pulse text-lg" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider">Live Diagnostic Whiteboard</h3>
            <p className="text-[10px] text-slate-400 font-bold">Both peers see annotations instantly</p>
          </div>
        </div>

        {/* Tools Palette */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Colors */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            {["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#a855f7"].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-5 h-5 rounded-full transition-transform active:scale-90 ${color === c ? "ring-2 ring-white scale-110" : ""}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Width */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-[10px] font-black uppercase text-slate-400">Brush</span>
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="w-16 accent-indigo-500 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Diagrams overlay (Only Doctor has control for diagrams, or both) */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <BsImage className="text-slate-400 text-xs" />
            <select
              value={selectedDiagram}
              onChange={(e) => setSelectedDiagram(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-wider focus:outline-none cursor-pointer text-slate-300"
            >
              {Object.entries(DIAGRAMS).map(([key, value]) => (
                <option key={key} value={key} className="bg-slate-800 text-white">
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
          >
            <BsTrashFill /> Clear
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative aspect-video w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center cursor-crosshair">
        {/* Render SVG Overlays */}
        {DIAGRAMS[selectedDiagram].svg}

        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full z-20"
        />
      </div>
    </div>
  );
};

export default SharedConsultationCanvas;
