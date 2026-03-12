import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HdbDetails from "./components/HdbDetails";
import HdbList from "./components/HdbList";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import {
  createHdb,
  deleteHdb,
  getHdbResalePage,
  getWatchlist,
} from "./service/hdbService";

const App = () => {
  const [hdbs, setHdbs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [townFilter, setTownFilter] = useState("");
  const [blockFilter, setBlockFilter] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [watchlistError, setWatchlistError] = useState("");
  const [watchlistActionError, setWatchlistActionError] = useState("");
  const pageSize = 100;
  const currentPage = Math.floor(currentOffset / pageSize) + 1;

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const filters = {
          ...(townFilter ? { town: townFilter } : {}),
          ...(blockFilter ? { block: blockFilter } : {}),
        };
        const result = await getHdbResalePage(currentOffset, pageSize, filters);
        setHdbs(result.records);
        setHasNextPage(result.records.length === result.pageSize);
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
  }, [currentOffset, townFilter, blockFilter]);

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

  const handlePageChange = (direction) => {
    if (direction === "previous") {
      setCurrentOffset((prev) => Math.max(0, prev - pageSize));
      return;
    }

    if (direction === "next" && hasNextPage) {
      setCurrentOffset((prev) => prev + pageSize);
    }
  };

  const handleTownFilterChange = (nextTown) => {
    setTownFilter(nextTown.trim().toUpperCase());
    setCurrentOffset(0);
  };

  const handleBlockFilterChange = (nextBlock) => {
    setBlockFilter(nextBlock.trim().toUpperCase());
    setCurrentOffset(0);
  };

  const handleToggleWatchlist = async (listing) => {
    setWatchlistActionError("");
    const listingId = String(listing._id);
    const existingWatchlistItem = watchlist.find(
      (item) => String(item._id) === listingId,
    );

    try {
      if (existingWatchlistItem) {
        await deleteHdb(existingWatchlistItem.airtableId);
        setWatchlist((prev) =>
          prev.filter((item) => String(item._id) !== listingId),
        );
        return { action: "removed" };
      }

      const created = await createHdb(listing);
      setWatchlist((prev) => [
        ...prev,
        {
          ...listing,
          _id: listingId,
          airtableId: created?.id,
        },
      ]);
      return { action: "added" };
    } catch (error) {
      const errorMsg = error?.message || "Failed to update watchlist";
      setWatchlistActionError(errorMsg);
      console.error("Failed to update Airtable watchlist:", error);
      throw error;
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
              townFilter={townFilter}
              blockFilter={blockFilter}
              hasPreviousPage={currentOffset > 0}
              hasNextPage={hasNextPage}
              onTownFilterChange={handleTownFilterChange}
              onBlockFilterChange={handleBlockFilterChange}
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
              toggleWatchlist={handleToggleWatchlist}
              watchlistActionError={watchlistActionError}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
