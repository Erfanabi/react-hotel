import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookMark } from "../context/BookMarksProvider";

function NewBookMark() {
  const navigate = useNavigate();

  const { createBookMarkNote } = useBookMark();

  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (err) {
        console.log(err.response.data.error);
      }
    }

    fetchData();
  }, [lat, lng]);

  async function handleAddNote(e) {
    e.preventDefault();

    const newBookMarkNote = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    await createBookMarkNote(newBookMarkNote);
    navigate("/bookmark");
  }

  return (
    <div>
      <h2>BookMark New Location</h2>
      <form className="form" onSubmit={handleAddNote}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default NewBookMark;
