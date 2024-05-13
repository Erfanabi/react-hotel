import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { id } = useParams();

  const { data, loading } = useFetch("https://api-react-hotel.vercel.app/hotels", `/${id}`);

  return (
    <div>
      {loading ? (
        <div className="room">
          <div className="roomDetail">
            <h2>{data.name}</h2>
            <div>
              {data.number_of_reviews} reviews &bull; {data.smart_location}
            </div>
            {/* <img src={data.picture_url.url} alt={data.name} /> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SingleHotel;
