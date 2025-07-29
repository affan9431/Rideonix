import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import RideAndMap from "./pages/RideAndMap";
import LocationReferral from "./pages/LocationReferral";
import SelectVehicleType from "./pages/SelectVehicleType";
import WelcomeUpload from "./pages/WelcomeUpload";
import SelectLanguage from "./pages/SelectLanguage";
import OTPVerification from "./pages/OTPVerification";
import RegisterName from "./pages/RegisterName";
import RegisterEmail from "./pages/RegisterEmail";
import TermAndCondition from "./pages/TermAndCondition";
import Drive from "./pages/Drive";
import Registeration from "./pages/Registeration";
import { LocationProvider } from "./context/LocationProvider";
import GetLocationForm from "./component/GetLocationForm";
import RideTypeSelector from "./component/RideTypeSelector";
import { OnboardingProvider } from "./context/OnboardingProvider";
import DriverDashboard from "./pages/DriverDashboard";
import RiderProtectedRoute from "./protected/RiderProtectedRoute";
import DriverProtectedRoute from "./protected/DriverProtectedRoute";
import DriverOnTheWay from "./component/DriverOnTheWay";
import CarCard from "./component/CarCard";
import RideDetailsToDriver from "./component/RideDetailsToDriver";
import DriverProfile from "./component/DriverProfile";
import RiderProfile from "./component/RIderProfile";
import RiderHelpPage from "./pages/RiderHelpPage";
import RiderRideHistory from "./pages/RiderRideHistory";
import DriverPerformance from "./component/DriverPerformance";
import QRUPIPayment from "./component/QRUPIPayment";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./component/PageNoutFound";
import RegisterPhoneNumber from "./pages/RegisterPhoneNumber";
import GoogleOTPVerification from "./pages/GoogleOTPVerification";

function App() {
  return (
    <LocationProvider>
      <OnboardingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/app/home" />} />{" "}
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="drive" element={<Drive />} />
              <Route path="rider-profile" element={<RiderProfile />} />
              <Route path="help" element={<RiderHelpPage />} />
              <Route path="ride-history" element={<RiderRideHistory />} />
            </Route>
            <Route path="register" element={<Registeration />} />
            <Route
              path="registerPhoneNumber"
              element={<RegisterPhoneNumber />}
            />
            <Route path="otp-verification" element={<OTPVerification />} />{" "}
            <Route
              path="google-otp-verification"
              element={<GoogleOTPVerification />}
            />{" "}
            <Route path="register/name" element={<RegisterName />} />
            <Route path="register/email" element={<RegisterEmail />} />
            <Route path="term-and-conditions" element={<TermAndCondition />} />
            <Route path="location-referral" element={<LocationReferral />} />
            <Route path="select-vehicle" element={<SelectVehicleType />} />
            <Route path="select-language" element={<SelectLanguage />} />
            <Route path="documents" element={<WelcomeUpload />} />
            <Route path="ride" element={<RiderProtectedRoute />}>
              <Route path="" element={<RideAndMap />}>
                <Route index element={<Navigate replace to="location" />} />
                <Route path="location" element={<GetLocationForm />} />
                <Route
                  path="vehicle-selection"
                  element={<RideTypeSelector />}
                />
                <Route path="ride-accept" element={<DriverOnTheWay />} />
              </Route>
            </Route>
            <Route path="driver" element={<DriverProtectedRoute />}>
              <Route path="" element={<DriverDashboard />}>
                <Route index element={<Navigate replace to="info" />} />
                <Route path="info" element={<CarCard />} />
                <Route path="on-the-way" element={<RideDetailsToDriver />} />
                <Route path="profile" element={<DriverProfile />} />
                <Route path="performance" element={<DriverPerformance />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "black",
              color: "white",
            },
          }}
        />
      </OnboardingProvider>
    </LocationProvider>
  );
}

export default App;
