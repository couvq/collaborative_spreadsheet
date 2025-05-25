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
        top: y,
        left: x,
      }}
      className="cursor"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path fill="#FBFF3D" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z"></path>
      </svg>
    </div>
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
