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
import { useParams } from "react-router-dom";

const HdbDetails = ({ hdbs, watchlist, addToWatchlist }) => {
  const { hdbId } = useParams();
  const hdb = hdbs.find((item) => item._id === Number(hdbId));
  const isInWatchlist = watchlist.some((item) => item._id === hdb?._id);

  if (!hdb) return <h2>HDB Listing Not Found!</h2>;

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
          onClick={() => addToWatchlist(hdb)}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </main>
  );
};

export default HdbDetails;
