import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="navbar px-6 py bg-base-100 shadow">
      <div className="flex-1">
        {pathname !== "/" && (
          <Link to="/" className="btn btn-square btn-success">
            <BsArrowReturnLeft size={20} />
          </Link>
        )}
        <button className="btn btn-ghost normal-case text-xl">QalamAI</button>
      </div>
      <div className="flex-none gap-8">
        <input
          type="checkbox"
          className="toggle toggle-lg toggle-success"
          checked={isDark}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
}
