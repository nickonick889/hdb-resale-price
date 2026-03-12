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

const DETAIL_LABELS = {
  _id: "Listing ID",
  month: "Transaction Month",
  town: "Town",
  flat_type: "Flat Type",
  block: "Block",
  street_name: "Street Name",
  storey_range: "Storey Range",
  floor_area_sqm: "Floor Area",
  flat_model: "Flat Model",
  lease_commence_date: "Lease Commence Date",
  remaining_lease: "Remaining Lease",
  resale_price: "Resale Price",
  area: "Area",
};

const HIDDEN_FIELDS = new Set(["airtableId"]);

function formatLabel(fieldName) {
  if (DETAIL_LABELS[fieldName]) {
    return DETAIL_LABELS[fieldName];
  }

  return fieldName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(fieldName, value) {
  if (value == null || value === "") {
    return "N/A";
  }

  if (fieldName === "resale_price") {
    return `$${Number(value).toLocaleString()}`;
  }

  if (fieldName === "floor_area_sqm" || fieldName === "area") {
    return `${value} sqm`;
  }

  return String(value);
}

const HdbDetails = ({
  hdbs,
  watchlist,
  toggleWatchlist,
  watchlistActionError,
}) => {
  const { hdbId } = useParams();
  const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState(false);
  const [lastAction, setLastAction] = useState("");

  const hdb =
    hdbs.find((item) => String(item._id) === hdbId) ||
    watchlist.find(
      (item) => String(item._id) === hdbId || String(item.airtableId) === hdbId,
    );

  const isInWatchlist = watchlist.some(
    (item) => String(item._id) === String(hdb?._id),
  );

  const detailEntries = Object.entries(hdb).filter(
    ([fieldName]) => !HIDDEN_FIELDS.has(fieldName),
  );

  if (!hdb) return <h2>HDB Listing Not Found!</h2>;

  const handleClick = async () => {
    setIsUpdatingWatchlist(true);
    try {
      const result = await toggleWatchlist(hdb);
      setLastAction(result?.action || "");
      setTimeout(() => setLastAction(""), 2000);
    } catch {
      setLastAction("");
    } finally {
      setIsUpdatingWatchlist(false);
    }
  };

  return (
    <main>
      <h2>{hdb.street_name}</h2>
      <div className="details-box">
        {detailEntries.map(([fieldName, value]) => (
          <p key={fieldName}>
            <strong>{formatLabel(fieldName)}:</strong>{" "}
            {formatValue(fieldName, value)}
          </p>
        ))}

        <button
          type="button"
          onClick={handleClick}
          disabled={isUpdatingWatchlist}
        >
          {isUpdatingWatchlist
            ? isInWatchlist
              ? "Removing..."
              : "Adding..."
            : lastAction === "added"
              ? "Added to Watchlist"
              : lastAction === "removed"
                ? "Removed from Watchlist"
                : isInWatchlist
                  ? "Already in Watchlist"
                  : "Add to Watchlist"}
        </button>

        {watchlistActionError && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            Error: {watchlistActionError}
          </p>
        )}
      </div>
    </main>
  );
};

export default HdbDetails;
