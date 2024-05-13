import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotel } from "../context/HotelsProvider";

function Hotels() {
  const { data, loading } = useHotel();

  return (
    <div>
      {loading ? (
        <div className="searchList">
          <h2>Search Results: ({data.length})</h2>
          {data.map((item) => {
            return <SearchItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Hotels;

function SearchItem({ item }) {
  return (
    <Link
      key={item.id}
      to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
    >
      <div className="searchItem">
        <img src={item.thumbnail_url} alt={item.name} />
        <div className="searchItemDesc">
          <p className="location">{item.smart_location}</p>
          <p className="name">{item.name}</p>
          $&nbsp;{item.price}&nbsp;<span>night</span>
        </div>
      </div>
    </Link>
  );
}
