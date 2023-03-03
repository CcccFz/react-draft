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
        </Route>
      </Routes>
    </div>
  )
}

export default App
