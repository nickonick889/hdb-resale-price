export default function EditPetForm() {
  return (
    <form>
      <fieldset>
        <legend>Edit Pet</legend>

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
    </form>
  );
}
