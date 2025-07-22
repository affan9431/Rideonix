import axios from "axios";
import { jwtDecode } from "jwt-decode";

const riderToken = localStorage.getItem("riderToken");
const decoded = riderToken && jwtDecode(riderToken);

export default async function getRiderInfo() {
  const res = await axios.get(`http://localhost:3000/api/rider/${decoded.id}`);
  return res.data.data;
}
