import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import hdbDataRaw from "./hdbData.json";
import Navbar from "./components/Navbar";
import HdbList from "./components/HdbList";
import HdbForm from "./components/HdbForm";
import HdbDetails from "./components/HdbDetails";
import Watchlist from "./pages/Watchlist";

const App = () => {
  const [hdbs, setHdbs] = useState(hdbDataRaw);
  const [watchlist, setWatchlist] = useState([]);

  const addHdb = (newHdb) => {
    // Generate a new ID by finding the max ID and adding 1
    newHdb._id = hdbs.length > 0 ? Math.max(...hdbs.map((h) => h._id)) + 1 : 1;
    setHdbs([...hdbs, newHdb]);
  };

  const addToWatchlist = (listing) => {
    const exists = watchlist.some((item) => item._id === listing._id);

    if (exists) return;

    setWatchlist([...watchlist, listing]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>HDB Resale Tracker</h1>
            </main>
          }
        />
        <Route path="/hdbs" element={<HdbList hdbs={hdbs} showFilters />} />
        <Route path="/watchlist" element={<Watchlist hdbs={watchlist} />} />
        <Route path="/hdbs/new" element={<HdbForm addHdb={addHdb} />} />
        <Route
          path="/hdbs/:hdbId"
          element={
            <HdbDetails
              hdbs={hdbs}
              watchlist={watchlist}
              addToWatchlist={addToWatchlist}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
