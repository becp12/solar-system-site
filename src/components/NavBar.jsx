import "./NavBar.css";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="NavBar">
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/PlanetInfo">PlanetName</Link>
    </nav>
  );
}