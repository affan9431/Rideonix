import RideSection from "../component/RideSection";
import Suggestions from "../component/Suggestions";
import LoginPrompt from "../component/LoginPrompt";
import RentOutSection from "../component/RentOutSection";

function Home() {
  return (
    <div>
      <RideSection />
      <Suggestions />
      <LoginPrompt />
      <RentOutSection />
    </div>
  );
}

export default Home;
