import axios from "axios";

const API_URL = "/api"; // Use the proxy

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};
