import { useState } from "react";
import daxiangPng from '../assets/daxiang.png';

export function BaseRenderProps() {
  return (
    <Mouse render={(mouse: any) => <Xiaoxin mouse={mouse} />} />
  );
}

function Mouse(props: any) {
  const [mouse, moveMouse] = useState({left: 0, top: 0})

  return (
    <div style={{ height: '100vh' }} onMouseMove={(e: any) => moveMouse({left: e.clientX, top: e.clientY}) }>
      {props.render(mouse)}
    </div>
  );
}

export function Xiaoxin(props: any) {
  return (
    <img src={daxiangPng} style={{
      position: "absolute",
      width: "96px",
      height: "96px",
      left: props.mouse.left,
      top: props.mouse.top,
    }} />
  );
}