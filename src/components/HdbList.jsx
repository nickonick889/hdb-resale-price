import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const HdbList = ({ hdbs, title = "HDB Listings", showFilters = false }) => {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedTown, setSelectedTown] = useState("all");

  const monthOptions = useMemo(() => {
    const uniqueMonths = [
      ...new Set(hdbs.map((hdb) => hdb.month).filter(Boolean)),
    ];
    return uniqueMonths.sort((left, right) => right.localeCompare(left));
  }, [hdbs]);

  const townOptions = useMemo(() => {
    const uniqueTowns = [
      ...new Set(hdbs.map((hdb) => hdb.town).filter(Boolean)),
    ];
    return uniqueTowns.sort((left, right) => left.localeCompare(right));
  }, [hdbs]);

  const filteredHdbs = useMemo(() => {
    return hdbs.filter((hdb) => {
      const matchMonth = selectedMonth === "all" || hdb.month === selectedMonth;
      const matchTown = selectedTown === "all" || hdb.town === selectedTown;

      return matchMonth && matchTown;
    });
  }, [hdbs, selectedMonth, selectedTown]);

  return (
    <main>
      <h1>{title}</h1>
      {showFilters && (
        <div className="hdb-filter-bar">
          <label htmlFor="monthFilter">Month:</label>
          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
          >
            <option value="all">All</option>
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <label htmlFor="townFilter">Area:</label>
          <select
            id="townFilter"
            value={selectedTown}
            onChange={(event) => setSelectedTown(event.target.value)}
          >
            <option value="all">All</option>
            {townOptions.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredHdbs.length === 0 && <p>No listings found for this filter.</p>}

      <ul className="hdb-container">
        {filteredHdbs.map((hdb) => (
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
    </main>
  );
};

export default HdbList;
