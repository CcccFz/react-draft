import { Routes, Route } from "react-router-dom";
import Layout from './Layout'
import About from './About'
import Dashboard from './Dashboard'
import Home from './Home'

import { Todo } from './Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />  
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
