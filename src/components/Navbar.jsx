import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/hdbs">Hdb Listings</NavLink>
        </li>
        <li>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </li>
        <li>
          <NavLink to="/hdbs/new">Add Hdb</NavLink>
        </li>
        <li>
          <NavLink to="/hdbs/2">Edit Hdb</NavLink>
        </li>
      </ul>
    </nav>
  );
}
