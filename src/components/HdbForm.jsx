import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HdbForm = ({ addHdb }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    town: "",
    block: "",
    street_name: "",
    resale_price: "",
    flat_type: "3 ROOM",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHdb(formData);
    navigate("/hdbs");
  };

  return (
    <main>
      <h2>Add New Watchlist Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Town:</label>
        <input
          name="town"
          value={formData.town}
          onChange={handleChange}
          required
        />

        <label>Block:</label>
        <input
          name="block"
          value={formData.block}
          onChange={handleChange}
          required
        />

        <label>Street Name:</label>
        <input
          name="street_name"
          value={formData.street_name}
          onChange={handleChange}
          required
        />

        <label>Resale Price:</label>
        <input
          name="resale_price"
          type="number"
          value={formData.resale_price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add HDB</button>
      </form>
    </main>
  );
};

export default HdbForm;
