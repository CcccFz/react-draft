import {
  Button,
  Checkbox,
  Input,
  List, Pagination
} from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

export function BoxPage() {
  return (
    <div id="box-page" >
      <BoxPanel />
    </div>
  );
}

interface BoxPanelState {
  box_name: string
  is_display: boolean
  display_status: boolean | undefined
  setBoxName: (box_name: string) => void
  trigerIsDisplay: () => void
  changeDisplayStatus: (display_status: boolean | undefined) => void
}

const useBoxPanelStore = create<BoxPanelState>()((set) => ({
  box_name: "",
  is_display: true,
  display_status: undefined,
  setBoxName: (box_name) => set(() => ({ box_name })),
  trigerIsDisplay: () => set((state) => ({is_display: !state.is_display})),
  changeDisplayStatus: (display_status) => set(() => ({display_status}))
}));

function BoxPanel() {
  const { 
    box_name, is_display, display_status,
    setBoxName, trigerIsDisplay, changeDisplayStatus
  } = useBoxPanelStore((state) => ({...state}), shallow)

  const createBox = () => {
    const data = axios.post("http://dev.app.puliedu.com"+'/api/external/water_box/create', {
      device_id: box_name, device_name: box_name,
      live_stream_url: 'xxx.xxx', is_display
    }).then(res => res.data.data);
    setBoxName('');
  }

  return (
    <div id="box-panel">
      <Input value={box_name} onChange={e => setBoxName(e.target.value)} style={{ width: 'calc(50% - 100px)' }} placeholder="Input box name..." />
      <Button type="primary" onClick={createBox}>Add</Button>
      <br />
      IsDisplay: {" "} <Checkbox checked={is_display} onClick={trigerIsDisplay} />

      <BoxList boxPanel={{box_name, is_display}} />

      Show: {" "}
      <Button disabled={display_status === undefined} onClick={() => changeDisplayStatus(undefined)}>All</Button>
      <Button disabled={display_status === true} onClick={() => changeDisplayStatus(true)}>Display</Button>
      <Button disabled={display_status === false} onClick={() => changeDisplayStatus(false)}>Not Display</Button>
    </div>
  );
}


const fetcher = (url: string, param: any) => {
  const data = axios.post("http://dev.app.puliedu.com"+url, param).then(res => res.data.data);
  return data;
}

function BoxList(props: any) {
  const [pageIndex, setPageIndex] = useState(1);
  const { box_name, is_display } = props.boxPanel;
  const { data, error, isLoading } = useSWR('/api/external/water_box/list', url => fetcher(url, {page_size: 10, page_index: pageIndex}));

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  const boxes = data.boxes.filter((box: any) => {
    if (is_display !== box.is_display) {
      return false;
    }
    if (box.device_name.indexOf(box_name) === -1) {
      return false;
    }
    return true;
  });

  return (
    <div id="box-list">
      <List
        size="small"
        dataSource={boxes}
        renderItem={(box: any) => <List.Item>{box.device_name}</List.Item>}
        style={{ width: 'calc(50% - 100px)' }}
      />
      <Pagination current={pageIndex} onChange={setPageIndex} total={data.total} style={{ width: 'calc(50% - 100px)' }} />
    </div>
  );
}