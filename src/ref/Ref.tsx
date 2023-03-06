import { useEffect, useRef } from "react";

export function BaseRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label>Name: <input ref={inputRef} /></label>
      <div>
        <button onClick={() => inputRef.current?.focus()}>Focus</button>
      </div>
    </>
  );
}