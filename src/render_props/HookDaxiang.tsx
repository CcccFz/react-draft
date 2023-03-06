import { useState } from "react";
import { Xiaoxin } from "./BaseRenderProps";

export function HookDaxiang() {
  const [mouse, mouceComponent] = useMouse();
  return mouceComponent(<Xiaoxin mouse={mouse} />);
}

function useMouse(): [any, any] {
  const [mouse, setMouse] = useState({left: 0, top: 0});

  const handleMouseMove = (e: any) => {
    setMouse({left: e.clientX, top: e.clientY})
  }

  return [mouse, (children: any) => (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {children}
    </div>
  )];
}