import { useState } from "react";

export function BaseHook() {
  const [cnt, setCnt] = useState(0);
  return (
    <button onClick={() => setCnt(cnt+1)} >{cnt}</button>
  );
}