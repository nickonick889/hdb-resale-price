import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/hdb">Hdb</NavLink>
        </li>
        <li>
          <NavLink to="/hdb/areas">Hdb area</NavLink>
        </li>
        <li>
          <NavLink to="/hdb/new">Hdb new</NavLink>
        </li>
        <li>
          <NavLink to="/hdb/2/edit">Edit Hdb</NavLink>
        </li>
      </ul>
    </nav>
  );
}
