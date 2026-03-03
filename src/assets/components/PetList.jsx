//@ts-check

import { Link } from "react-router";

/**
 * @typedef {{ id: string, name: string }} Pet
 * @param {{ pets: Pet[]}} param0
 * @returns
 */
export default function PetList({ pets }) {
  if (pets.length === 0) {
    return <p>No Pets</p>;
  }

  return (
    <>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
