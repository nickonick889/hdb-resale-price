import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HdbList = ({
  hdbs,
  title = "HDB Listings",
  isLoading = false,
  errorMessage = "",
  currentPage,
  townFilter = "",
  blockFilter = "",
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onTownFilterChange,
  onBlockFilterChange,
}) => {
  const [townInput, setTownInput] = useState(townFilter);
  const [blockInput, setBlockInput] = useState(blockFilter);

  useEffect(() => {
    setTownInput(townFilter);
  }, [townFilter]);

  useEffect(() => {
    setBlockInput(blockFilter);
  }, [blockFilter]);

  const hasPagination =
    typeof currentPage === "number" && typeof onPageChange === "function";

  const canFilterByTown = typeof onTownFilterChange === "function";
  const canFilterByBlock = typeof onBlockFilterChange === "function";
  const canFilter = canFilterByTown || canFilterByBlock;

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onTownFilterChange?.(townInput);
    onBlockFilterChange?.(blockInput);
  };

  const handleFilterReset = () => {
    setTownInput("");
    setBlockInput("");
    onTownFilterChange?.("");
    onBlockFilterChange?.("");
  };

  return (
    <main className="hdb-list-page">
      <h1>{title}</h1>

      {canFilter && (
        <form onSubmit={handleFilterSubmit} className="hdb-filter-form">
          <div className="hdb-filter-inputs">
            <div className="hdb-filter-field">
              <label htmlFor="town-filter">Town</label>
              <input
                id="town-filter"
                type="text"
                value={townInput}
                onChange={(event) =>
                  setTownInput(event.target.value.toUpperCase())
                }
                placeholder="e.g. ANG MO KIO"
              />
            </div>
            <div className="hdb-filter-field">
              <label htmlFor="block-filter">Block</label>
              <input
                id="block-filter"
                type="text"
                value={blockInput}
                onChange={(event) =>
                  setBlockInput(event.target.value.toUpperCase())
                }
                placeholder="e.g. 123"
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            Apply
          </button>
          <button
            type="button"
            onClick={handleFilterReset}
            disabled={isLoading || (!townFilter && !blockFilter)}
          >
            Clear
          </button>
        </form>
      )}

      {isLoading && <p>Loading listings...</p>}
      {!isLoading && errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && hdbs.length === 0 && (
        <p>
          No listings found
          {townFilter || blockFilter
            ? ` for ${townFilter || "Any Town"} / ${blockFilter || "Any Block"}`
            : ""}
          .
        </p>
      )}

      <ul className="hdb-container">
        {hdbs.map((hdb) => (
          <li key={hdb._id || hdb.airtableId} className="hdb-card">
            <Link to={`/hdbs/${hdb._id || hdb.airtableId}`}>
              <h3>{hdb.town}</h3>
              <p>Block {hdb.block}</p>
              <p>${Number(hdb.resale_price).toLocaleString()}</p>
              <p>{hdb.flat_type}</p>
              <p>View full details</p>
            </Link>
          </li>
        ))}
      </ul>

      {hasPagination && (
        <div className="hdb-pagination">
          <button
            type="button"
            onClick={() => onPageChange("previous")}
            disabled={!hasPreviousPage || isLoading}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            type="button"
            onClick={() => onPageChange("next")}
            disabled={!hasNextPage || isLoading}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default HdbList;
