import { useState } from 'react'
import { create } from 'zustand'
import { devtools, redux } from 'zustand/middleware'

interface BearState {
  bears: number
  add: (val: number) => void
}

const useBearStore = create<BearState>()(devtools((set) => ({
  bears: 0,
  add: (num: number) => set(state => ({ bears: state.bears + num })),
})))

export const ZustandExample: React.FC<{}> = () => {
  return (
    <div>
      <BearCounter />
      <BearBtn />
    </div>
  );
}

function BearCounter() {
  const bears = useBearStore(state => state.bears);
  return (
    <h1>{bears}</h1>
  );
}

function BearBtn() {
  const [num, setNum] = useState(0);
  const addBear = useBearStore(state => state.add);
  return (
    <>
    <input value={num} onChange={e => setNum(parseInt(e.target.value, 10))} />
    <button onClick={e => addBear(num)}>Add</button>
    </>
  );
}