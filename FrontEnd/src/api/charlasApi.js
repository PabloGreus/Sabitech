import { Charla } from "../models/Charla";
import { ApiError } from "../models/apiErrors";
import { page } from "../models/page";

const API_URL = "http://localhost:8080/api";
const CHARLAS_ENDPOINT = `${API_URL}/charlas`;

export async function listCharla() {
  const response = await fetch(CHARLAS_ENDPOINT);
  const json = await response.json();
  if (!response.ok) {
    throw new ApiError(json.message, response.status);
  }
  return page.fromJson(json, "charlas", Charla.fromJson);
}
