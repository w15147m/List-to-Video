import { get } from "@/services/apiServices";
import { toast } from "react-toastify";

export const fetchData = async (endpoint, setData, setLoader) => {
  setLoader(true);
  try {
    const response = await get(endpoint);
    setData(response.data);
  } catch (error) {
    toast.error(error.message || "Failed to fetch categories");
  } finally {
    setLoader(false);
  }
};
