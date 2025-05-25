import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import "./Presence.css";

type Position = {
  x: number;
  y: number;
};

type SocketPosition = {
  socketId: string;
  position: Position;
};

const handleMouseMove = (e: MouseEvent) => {
  const position = { x: e.clientX, y: e.clientY };
  socket.emit("cursor_move", position);
};

const Cursor = ({ x, y }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: y,
        left: x,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        /* Add your cursor styles here */
        backgroundColor: "white",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        zIndex: 100,
      }}
    />
  );
};

const Presence = () => {
  const [userPositions, setUserPositions] = useState(new Map());
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    const handlePositionChange = (socketPositions: string) => {
      console.log(`received new socket position info: ${socketPositions}`);
      setUserPositions(new Map(JSON.parse(socketPositions)));
    };
    socket.on("cursor_move", handlePositionChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      socket.off("cursor_move", handlePositionChange);
    };
  }, []);
  return (
    <div className="presence_overlay">
      {Array.from(userPositions.entries()).map(([socketId, position]) =>
        socketId !== socket.id ? <Cursor x={position.x} y={position.y} /> : null
      )}
    </div>
  );
};

export default Presence;
