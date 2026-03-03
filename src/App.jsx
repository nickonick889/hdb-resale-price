import "@picocss/pico/css/pico.css";
import { Route, Routes } from "react-router";
// import EditPetForm from "./components/EditPetForm";
import Navbar from "./components/Navbar";
// import CreatePetPage from "./pages/CreatePetPage";
// import OnePetPage from "./pages/OnePetPage";
// import PetsPage from "./pages/PetsPage";

const App = () => {
  return (
    <>
      <h1>Pets Store</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/pets/:petId" element={<OnePetPage />} />
        <Route path="/pets/new" element={<CreatePetPage />} />
        <Route path="/pets/:petId/edit" element={<EditPetForm />} />
      </Routes>
    </>
  );
};

export default App;
