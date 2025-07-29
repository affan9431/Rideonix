import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default async function getDriverInfo() {
  const driverToken = localStorage.getItem("driverToken");
  const decoded = driverToken && jwtDecode(driverToken);
  const res = await axios.get(`https://rideonix-backend.onrender.com/api/driver/${decoded.id}`);
  return res.data.data;
}
