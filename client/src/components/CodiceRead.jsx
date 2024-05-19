import { useState } from "react";
import CodiceHeader from "../Utils/CodiceHeader";

function CodiceRead() {
  const [headerSize, setHeaderSize] = useState("");

  return (
    <div className="relative min-h-[100svh] w-full">
      <CodiceHeader headerSize={headerSize} setHeaderSize={setHeaderSize} />
    </div>
  );
}

export default CodiceRead;
