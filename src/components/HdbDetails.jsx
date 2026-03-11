//@ts-check
/**
 * /**
 * @typedef {Object} HdbListing
 * @property {number} _id
 * @property {string} month
 * @property {string} town
 * @property {string} flat_type
 * @property {string} block
 * @property {string} street_name
 * @property {number} floor_area_sqm
 * @property {string} remaining_lease
 * @property {number} resale_price
 */
import { useState } from "react";
import { useParams } from "react-router-dom";

const HdbDetails = ({ hdbs, watchlist, addToWatchlist, addWatchlistError }) => {
  const { hdbId } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const hdb =
    hdbs.find((item) => String(item._id) === hdbId) ||
    watchlist.find(
      (item) => String(item._id) === hdbId || String(item.airtableId) === hdbId,
    );

  const isInWatchlist = watchlist.some(
    (item) => String(item._id) === String(hdb?._id),
  );

  if (!hdb) return <h2>HDB Listing Not Found!</h2>;

  const handleClick = async () => {
    setIsAdding(true);
    try {
      await addToWatchlist(hdb);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <main>
      <h2>{hdb.street_name}</h2>
      <div className="details-box">
        <p>
          <strong>Town:</strong> {hdb.town}
        </p>
        <p>
          <strong>Block:</strong> {hdb.block}
        </p>
        <p>
          <strong>Transaction Month:</strong> {hdb.month || "N/A"}
        </p>
        <p>
          <strong>Price:</strong> ${Number(hdb.resale_price).toLocaleString()}
        </p>
        <p>
          <strong>Flat Type:</strong> {hdb.flat_type}
        </p>
        <p>
          <strong>Remaining Lease:</strong> {hdb.remaining_lease}
        </p>
        <p>
          <strong>Area:</strong> {hdb.floor_area_sqm} sqm
        </p>

        <button
          type="button"
          onClick={handleClick}
          disabled={isInWatchlist || isAdding}
        >
          {justAdded
            ? "✓ Added to Watchlist"
            : isInWatchlist
              ? "Already in Watchlist"
              : isAdding
                ? "Adding..."
                : "Add to Watchlist"}
        </button>

        {addWatchlistError && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            Error: {addWatchlistError}
          </p>
        )}
      </div>
    </main>
  );
};

export default HdbDetails;
