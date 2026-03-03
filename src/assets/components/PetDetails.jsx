//@ts-check

import { useNavigate } from "react-router";
import { deletePet } from "../services/petService";

/**
 * @typedef {{ id: string; name: string; age: number; breed: string}} Pet
 * @param {{ pet: Pet}} props
 * @returns
 */
export default function PetDetails({ pet }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    deletePet(pet.id);
    navigate("/pets");
  };

  return (
    <>
      <h2>{pet.name}</h2>
      <dl>
        <dt>Age</dt>
        <dd>{pet.age} years</dd>
        <dt>Breed</dt>
        <dd>{pet.breed}</dd>
      </dl>

      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
