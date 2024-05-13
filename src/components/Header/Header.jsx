import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiLogout, HiSearch } from "react-icons/hi";
import QuestOptionList from "./QuestOptionList";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  function handleOption(type, operator) {
    operator == "inc"
      ? setOption((prev) => {
          return { ...prev, [type]: option[type] + 1 };
        })
      : setOption((prev) => {
          return { ...prev, [type]: option[type] - 1 };
        });
    // if (operator == "inc") {
    //   setOption((prev) => {
    //     return { ...prev, [type]: option[type] + 1 };
    //   });
    // }
  }

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  function handleBtnNavigateSearch() {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination: destination,
      option: JSON.stringify(option),
    });

    setSearchParams(encodedParams);

    navigate({ pathname: "Hotels", search: encodedParams.toString() });
  }
  return (
    <div className="header">
      <button className="link-icon" onClick={() => navigate("/")}>
        Home
      </button>
      —
      <button className="link-icon" onClick={() => navigate("/bookmark")}>
        bookmarks
      </button>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              moveRangeOnFirstSelection={true}
              minDate={new Date()}
            />
          )}
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option["adult"]} adult &bull; {option["children"]} children &bull;{" "}
            {option["room"]} room
          </div>
          <span className="seperator"></span>
          {openOption && (
            <QuestOptionList option={option} handleOption={handleOption} />
          )}
        </div>

        <div className="headerSearchItem">
          <button className="headerSearch" onClick={handleBtnNavigateSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <button className="link-icon">
        <User />
      </button>
    </div>
  );
}

export default Header;

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className="center">
          <div>{user.name}</div>
          <button>
            <HiLogout className="icon-logout" onClick={handleLogout} />
          </button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
