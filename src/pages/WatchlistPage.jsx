import HdbList from "../components/HdbList";

const WatchlistPage = ({ hdbs, isLoading = false, errorMessage = "" }) => {
  return (
    <HdbList
      hdbs={hdbs}
      title="Watchlist"
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};

export default WatchlistPage;
