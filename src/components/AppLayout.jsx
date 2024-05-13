import { Outlet } from "react-router-dom";
import Map from "./Map/Map";
import { useHotel } from "./context/HotelsProvider";

function AppLayout() {
  const { data, loading } = useHotel();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={data} />
    </div>
  );
}

export default AppLayout;
