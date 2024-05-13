import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const BookMarkContext = createContext();

export default function BookMarksProvider({ children }) {
  const BASE_URL = "https://api-react-hotel.vercel.app";

  const [bookmark, setBookmark] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmark(res.data);
        setIsLoading(true);
      } catch (err) {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // console.log(bookmark);

  async function createBookMarkNote(newBookMarkNote) {
    const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookMarkNote);
    // console.log(data);
    setBookmark((prev) => [...prev, data]);
  }

  async function deleteBookMarkNote(id) {
    await axios.delete(`${BASE_URL}/bookmarks/${id}`);
    setBookmark(bookmark.filter((item) => item.id != id));
  }

  return (
    <BookMarkContext.Provider
      value={{ bookmark, isLoading, createBookMarkNote, deleteBookMarkNote }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}

export const useBookMark = () => {
  return useContext(BookMarkContext);
};
