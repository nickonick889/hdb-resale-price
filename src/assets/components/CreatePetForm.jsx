import { createPet } from "../services/petService";

export default function CreatePetForm({ changeState }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newPet = await createPet(data);
    // console.log(newPet);
    changeState(newPet);
    // changeState(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create Pet</legend>

        <label>
          Name: <input type="text" name="name" />
        </label>

        <label>
          Age: <input type="number" name="age" />
        </label>

        <label>
          Breed:
          <select name="breed">
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
          </select>
        </label>
      </fieldset>
      <button>Create</button>
    </form>
  );
}
