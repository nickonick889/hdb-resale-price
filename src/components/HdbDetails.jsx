//@ts-check
import { useNavigate } from "react-router";
import { deletePet } from "../services/petServce";
/**
 * @typedef {{ id: string; name: string; age: number; breed: string}} Pet
 * @param {{ pet: Pet}} props
 * @returns
 */
export default function HdbDetails({ pet }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    deletePet(pet.id);
    navigate("/hdb");
  };

  return (
    <>
      <h2>{pet.name}</h2>
      <dl>
        <dt>Area</dt>
        <dd>{pet.age} years</dd>
        <dt>Price</dt>
        <dd>{pet.breed}</dd>
      </dl>

      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
