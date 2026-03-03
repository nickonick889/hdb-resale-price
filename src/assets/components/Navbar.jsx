import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/pets">Pets</NavLink>
        </li>
        <li>
          <NavLink to="/pets/2">One</NavLink>
        </li>
        <li>
          <NavLink to="/pets/new">New</NavLink>
        </li>
        <li>
          <NavLink to="/pets/2/edit">Edit</NavLink>
        </li>
      </ul>
    </nav>
  );
}
