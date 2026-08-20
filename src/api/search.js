import api from "../api";

export async function searchContent(query) {
  const response = await api.get("/api/search", { params: { q: query } });
  return response.data;
}
