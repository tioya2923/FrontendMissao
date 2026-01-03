import api from "../api";

export async function searchContent(query) {
  try {
    const response = await api.get("/api/search", { params: { q: query } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
