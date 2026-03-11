import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/hdbs">Hdb Listings</NavLink>
        </li>
        <li>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </li>
      </ul>
    </nav>
  );
}
