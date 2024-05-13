import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export const HotelContext = createContext();

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const room = JSON.parse(searchParams.get("options"))?.room;
  const destination = searchParams.get("destination");

  const { data, loading } = useFetch(
    "https://api-react-hotel.vercel.app/hotels",
    `?q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider value={{ data, loading }}>
      {children}
    </HotelContext.Provider>
  );
}

export const useHotel = () => {
  return useContext(HotelContext);
};
