import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div className="Layout">
      <nav className="Layout-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/base_hook">BaseHook</Link>
          </li>
          <li>
            <Link to="/hoc_example">HocExample</Link>
          </li>
          <li>
            <Link to="/render_props">RenderProps</Link>
            {' '}
            <Link to="/hook_daxiang">HookDaxiang</Link>
          </li>
          <li>
            <Link to="/ref">Ref</Link>
          </li>
          <li>
            <Link to="/formik_example">FormikExample</Link>
          </li>
          <li>
            <Link to="/zustand">ZustandExample</Link>
          </li>
          <li>
            <Link to="/tmp">Tmp</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <div className="Layout-content">
        <Outlet/>
      </div>
    </div>
  );
}