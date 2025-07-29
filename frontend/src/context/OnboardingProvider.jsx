import React from "react";

const OnboardingContext = React.createContext();

export function OnboardingProvider({ children }) {
  const [driverState, setDriverState] = React.useState(false);
  const [driverData, setDriverData] = React.useState({
    username: "",
    email: "",
    phoneNumber: "",
    cityName: "",
    referralCode: "",
    selectedVehicle: "",
    selectedLanguage: "",
    drivingLicense: null,
    profilePicture: null,
    aadhaarCard: null,
    rc: null,
  });
  
  return (
    <OnboardingContext.Provider
      value={{ driverState, setDriverState, driverData, setDriverData }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used inside a LocationProvider");
  }
  return context;
}
