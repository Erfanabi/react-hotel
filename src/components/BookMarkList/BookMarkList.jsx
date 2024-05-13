import ReactCountryFlag from "react-country-flag";
import { useBookMark } from "../context/BookMarksProvider";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { HiTrash } from "react-icons/hi";

function BookMarkList() {
  const { bookmark, isLoading } = useBookMark();

  const { deleteBookMarkNote } = useBookMark();

  // console.log(bookmark);

  async function handleDelete(e, id) {
    e.preventDefault();
    // console.log(id);

    await deleteBookMarkNote(id);
  }

  return (
    <div>
      <h2>BookmarkList</h2>
      {isLoading ? (
        <div className="bookmarkList">
          {bookmark.map((item) => {
            return (
              <Link
                key={item.id}
                to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}&id=${item.id}`}
              >
                <div key={item.id} className="bookmarkItem">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    <HiTrash className="trash" />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default BookMarkList;
