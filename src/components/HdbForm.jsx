import { useState } from "react";
import { useNavigate } from "react-router-dom";


const HdbForm = ({ addHdb }) => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  
const [formData, setFormData] = useState({
  town: '',
  block: '',
  street_name: '',
  resale_price: '',
  flat_type: '4 ROOM',
  floor_area_sqm: '', 
  remaining_lease: ''   
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await addHdb(formData);
      navigate("/hdbs");
    } catch (error) {
      setSubmitError("Unable to save listing to Airtable. Please try again.");
    }
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

        <label>Floor Area (sqm):</label>
        <input 
        name="floor_area_sqm" 
        type="number" 
        value={formData.floor_area_sqm} 
        onChange={handleChange} 
        />
        <label>Remaining Lease (e.g. 95 years):</label>
        <input 
          name="remaining_lease" 
          value={formData.remaining_lease} 
          onChange={handleChange} 
        />

        <button type="submit">Add HDB</button>
        {submitError && <p>{submitError}</p>}
      </form>
    </main>
  );
};

export default HdbForm;
