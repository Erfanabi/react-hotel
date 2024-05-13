import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function SignalBookmark() {
  const { id } = useParams();

  const { data, loading } = useFetch(
    "https://api-react-hotel.vercel.app/bookmarks",
    `/${id}`
  );

  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <div>
          <button onClick={() => navigate(-1)} className="btn btn--back">
            &larr; Back
          </button>
          <h2 style={{ marginTop: "2rem" }}>{data.cityName}</h2>
          <ReactCountryFlag svg countryCode={data.countryCode} />
          &nbsp;
          <span>{data.country}</span>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SignalBookmark;
