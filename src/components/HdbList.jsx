import { Link } from "react-router-dom";

const HdbList = ({
  hdbs,
  title = "HDB Listings",
  isLoading = false,
  errorMessage = "",
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const hasPagination =
    typeof currentPage === "number" &&
    typeof totalPages === "number" &&
    typeof onPageChange === "function";

  return (
    <main>
      <h1>{title}</h1>

      {isLoading && <p>Loading listings...</p>}
      {!isLoading && errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && hdbs.length === 0 && (
        <p>No listings found.</p>
      )}

      <ul className="hdb-container">
        {hdbs.map((hdb) => (
          <li key={hdb._id} className="hdb-card">
            <Link to={`/hdbs/${hdb._id}`}>
              <h3>{hdb.town}</h3>
              <p>Block {hdb.block}</p>
              <p>${Number(hdb.resale_price).toLocaleString()}</p>
              <p>{hdb.floor_area_sqm} sqm</p>
              <p>{hdb.remaining_lease}</p>
            </Link>
          </li>
        ))}
      </ul>

      {hasPagination && (
        <div className="hdb-pagination">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default HdbList;
