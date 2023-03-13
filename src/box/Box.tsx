import {
  Alert,
  Button,
  Checkbox,
  Input,
  List, Pagination
} from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import { create, useStore } from 'zustand';
import { shallow } from 'zustand/shallow';
import { box_url } from './puliedu';

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
  boxes: Object[]
  pageIndex: number
  total: number
  setBoxName: (box_name: string) => void
  trigerIsDisplay: () => void
  setPageIndex: (pageIndex: number) => void
  setBoxes: (boxes: Object[]) => void
  setTotal: (total: number) => void
}

const useBoxPanelStore = create<BoxPanelState>()((set) => ({
  box_name: "",
  is_display: true,
  pageIndex: 1,
  boxes: [],
  total: 0,
  setBoxName: (box_name) => set(() => ({ box_name })),
  trigerIsDisplay: () => set((state) => ({is_display: !state.is_display})),
  setPageIndex: (pageIndex) => set({ pageIndex }),
  setTotal: (total) => set({ total }),
  setBoxes: (boxes) => set({ boxes }),
}));

function BoxPanel() {
  const { 
    box_name, is_display,
    setBoxName, trigerIsDisplay, setBoxes, setPageIndex
  } = useBoxPanelStore((state) => ({...state}), shallow)

  const createBox = () => {
    axios.post(box_url.url+box_url.create, {
      device_id: box_name, device_name: box_name,
      live_stream_url: 'xxx.xxx', is_display
    }).then(res => res.data.data);

    axios.post(box_url.url+box_url.list, {page_size: 10, page_index: 1})
      .then(res => setBoxes(res.data.data.boxes));

    setBoxName('');
    setPageIndex(1);
  }

  return (
    <div id="box-panel">
      <Input value={box_name} onChange={e => setBoxName(e.target.value)} style={{ width: 'calc(50% - 100px)' }} placeholder="Input box name..." />
      <Button type="primary" onClick={createBox}>Add</Button>
      <br />
      IsDisplay: {" "} <Checkbox checked={is_display} onClick={trigerIsDisplay} />

      <BoxList />
    </div>
  );
}


const fetcher = (path: string, param: any) => {
  const data = axios.post(box_url.url+path, param).then(res => res.data.data);
  return data;
}

function BoxList() {
  const { box_name, is_display, boxes, pageIndex, total, setTotal, setBoxes, setPageIndex } = useBoxPanelStore((state) => ({...state}), shallow);

  useEffect(() => {
    axios.post(box_url.url+box_url.list, {page_size: 10, page_index: pageIndex})
      .then(res => {
        setBoxes(res.data.data.boxes.filter((box: any) => {
          if (is_display !== box.is_display) {
            return false;
          }
          if (box.device_name.indexOf(box_name) === -1) {
            return false;
          }
          return true;
        }));
        setTotal(res.data.data.total);
      })
      .catch(err =>alert(err));
  });

  return (
    <div id="box-list">
      <List
        size="small"
        dataSource={boxes}
        renderItem={(box: any) => <List.Item>{box.device_name}</List.Item>}
        style={{ width: 'calc(50% - 100px)' }}
      />
      <Pagination current={pageIndex} onChange={setPageIndex} total={total} style={{ width: 'calc(50% - 100px)' }} />
    </div>
  );
}