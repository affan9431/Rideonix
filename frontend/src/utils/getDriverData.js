import axios from "axios";
import { jwtDecode } from "jwt-decode";

const driverToken = localStorage.getItem("driverToken");
const decoded = driverToken && jwtDecode(driverToken);

export default async function getDriverInfo() {
  const res = await axios.get(`/api/driver/${decoded.id}`);
  return res.data.data;
}
