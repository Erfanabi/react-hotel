import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMark } from "../context/BookMarksProvider";

function BookMark() {
  const { bookmark, isLoading } = useBookMark();
  console.log(bookmark);

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>

      <Map markerLocation={bookmark} />
    </div>
  );
}

export default BookMark;
