import { Routes, Route } from "react-router-dom";
import Layout from './Layout'
import About from './About'
import Dashboard from './Dashboard'
import Home from './Home'
import { Todo } from './Todo';
import { Store } from "./StorePrice";
import { Welcome } from "./combine/welcome/Welcome";
import { Chat } from "./combine/chat/Chat";
import "./app.css";
import { Login } from "./combine/login/Login";
import { Product } from "./product/Product";
import { People } from "./fragment/People";
import { BaseHook } from "./base_hook/BaseHook";
import { HocExample } from "./hoc/Hoc"
import { BaseRef } from "./ref/Ref";
import { BaseRenderProps } from "./render_props/BaseRenderProps";
import { HookDaxiang } from "./render_props/HookDaxiang";
import { FormikExample } from "./formik/FormikExample";
import { ZustandExample } from "./zustand/ZustandExample";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />  
          <Route path="/todo" element={<Todo />} />
          <Route path="/store" element={<Store />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/people" element={<People />} />
          <Route path="/base_hook" element={<BaseHook />} />
          <Route path="/hoc_example" element={<HocExample />} />
          <Route path="/ref" element={<BaseRef />} />
          <Route path="/render_props" element={<BaseRenderProps />} />
          <Route path="/hook_daxiang" element={<HookDaxiang />} />
          <Route path="/formik_example" element={<FormikExample />} />
          <Route path="/zustand" element={<ZustandExample />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
