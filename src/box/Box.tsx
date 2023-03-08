import {
  Button,
  Checkbox,
  Input,
  List,
} from 'antd';
import axios from 'axios';
import useSWR from "swr";
import { create } from 'zustand'

export function BoxPage() {
  return (
    <div id="box-page" >
      <BoxPanel>
        <BoxList />
      </BoxPanel>
    </div>
  );
}

interface BoxPanelState {
  box_name: string
  is_display: boolean
  display_status: boolean | undefined
  setBoxName: (box_name: string) => void
  trigerIsDisplay: () => void
}

const BoxPanelStore = create<BoxPanelState>()((set) => ({
  box_name: "",
  is_display: false,
  display_status: undefined,
  setBoxName: (box_name) => set(() => ({ box_name })),
  trigerIsDisplay: () => set((state) => ({is_display: !state.is_display}))
}));

function BoxPanel(props: {children: any}) {
  const box_name = BoxPanelStore((state) => state.box_name)
  const setBoxName = BoxPanelStore((state) => state.setBoxName)
  const is_display = BoxPanelStore((state) => state.is_display)
  const trigerIsDisplay = BoxPanelStore((state) => state.trigerIsDisplay)
  const display_status = BoxPanelStore((state) => state.display_status)

  return (
    <div id="box-panel">
      <Input value={box_name} onChange={e => setBoxName(e.target.value)} style={{ width: 'calc(50% - 100px)' }} placeholder="Input box name..." />
      <Button type="primary">Add</Button>
      <br />
      IsDisplay: {" "} <Checkbox checked={is_display} onClick={trigerIsDisplay} />

      {props.children}

      Show: {" "}
      <Button disabled={display_status !== undefined}>All</Button>
      <Button disabled={display_status !== true}>Display</Button>
      <Button disabled={display_status !== false}>Not Display</Button>
    </div>
  );
}


const fetcher = (url: string) => {
  const data = axios.post("http://dev.app.puliedu.com"+url).then(res => res.data.data);
  return data;
}

function BoxList() {
  const { data, error, isLoading } = useSWR('/api/external/water_box/list', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div id="box-list">
      <List
        size="small"
        dataSource={data.boxes}
        renderItem={(box: any) => <List.Item>{box.device_id}</List.Item>}
        style={{ width: 'calc(50% - 100px)' }}
      />
    </div>
  );
}