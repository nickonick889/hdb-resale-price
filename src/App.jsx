import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HdbDetails from "./components/HdbDetails";
import HdbList from "./components/HdbList";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import {
  createHdb,
  getHdbResalePage,
  getWatchlist,
} from "./service/hdbService";

const App = () => {
  const [hdbs, setHdbs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [watchlistError, setWatchlistError] = useState("");
  const [addWatchlistError, setAddWatchlistError] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await getHdbResalePage(currentPage, 100);
        setHdbs(result.records);
        setTotalPages(Math.max(1, Math.ceil(result.total / result.pageSize)));
      } catch (error) {
        setErrorMessage(
          error?.message || "Unable to fetch HDB resale data right now.",
        );
        console.error("Failed to fetch HDB resale data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [currentPage]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setWatchlistLoading(true);
      setWatchlistError("");

      try {
        const records = await getWatchlist();
        setWatchlist(records);
      } catch (error) {
        setWatchlistError("Unable to load watchlist right now.");
        console.error("Failed to load watchlist from Airtable:", error);
      } finally {
        setWatchlistLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  const handleAddToWatchlist = async (listing) => {
    setAddWatchlistError("");
    const listingId = String(listing._id);
    const exists = watchlist.some((item) => String(item._id) === listingId);
    if (exists) return;

    try {
      const created = await createHdb(listing);
      setWatchlist((prev) => [
        ...prev,
        {
          ...listing,
          _id: listingId,
          airtableId: created?.id,
        },
      ]);
    } catch (error) {
      const errorMsg = error?.message || "Failed to add to watchlist";
      setAddWatchlistError(errorMsg);
      console.error("Failed to save to Airtable watchlist:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/hdbs"
          element={
            <HdbList
              hdbs={hdbs}
              title="HDB Listings"
              isLoading={isLoading}
              errorMessage={errorMessage}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              hdbs={watchlist}
              isLoading={watchlistLoading}
              errorMessage={watchlistError}
            />
          }
        />
        <Route
          path="/hdbs/:hdbId"
          element={
            <HdbDetails
              hdbs={hdbs}
              watchlist={watchlist}
              addToWatchlist={handleAddToWatchlist}
              addWatchlistError={addWatchlistError}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
