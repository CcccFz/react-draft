import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative h-32 w-32">
      <nav className="absolute inset-x-0 top-0 h-16">
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
            <Link to="/tmp">Tmp</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}