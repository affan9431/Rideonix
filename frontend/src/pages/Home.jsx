import RideSection from "../component/RideSection";
import Suggestions from "../component/Suggestions";
import LoginPrompt from "../component/LoginPrompt";
import RentOutSection from "../component/RentOutSection";
import UberNavbar from "../component/UberNavbar";
import RideBookingMap from "../component/RideBookingMap";
import useDarkMode from "../hooks/useDarkMode";

function Home() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white"}`}>
      <RideSection />
      <Suggestions />
      <LoginPrompt />
      <RentOutSection />
    </div>
  );
}

export default Home;
