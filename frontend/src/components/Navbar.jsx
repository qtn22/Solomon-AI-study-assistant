import { Link } from "react-router-dom";
import { House } from "lucide-react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/start" className="navbar-start">
        Get started now
      </Link>

      <Link to="/" className="navbar-home">
        <House size={28} />
      </Link>
    </nav>
  );
}

export default Navbar;