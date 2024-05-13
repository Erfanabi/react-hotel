import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query) {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}${query}`);
        setData(res.data);
        setIsLoading(true);
        toast.success("Successfully Fetch");
      } catch (err) {
        toast.error("This didn't work");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, query]);

  return { data, loading };
}
