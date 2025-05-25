import { useEffect } from "react";
import DataGrid from "./components/data_grid/index";
import Presence from "./components/Presence/index";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.connect();

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Presence />
      <DataGrid />
    </>
  );
}

export default App;
