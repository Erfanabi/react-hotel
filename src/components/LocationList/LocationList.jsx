import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function LocationList() {
  const { data, loading } = useFetch("https://api-react-hotel.vercel.app/hotels","");

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      {loading ? (
        <div className="locationList">
          {data.map((item) => (
            <LocationItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default LocationList;

function LocationItem({ item }) {
  return (
    <div className="locationItem">
      <img src={item.thumbnail_url} alt={item.name} />
      <div className="locationItemDesc">
        <p className="location">{item.smart_location}</p>
        <p className="name">{item.name}</p>
        <p className="price">
          $&nbsp;{item.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
}
