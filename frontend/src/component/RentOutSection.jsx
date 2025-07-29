import toast from "react-hot-toast";

const RentOutSection = () => {

  return (
    <section
      className={`flex flex-col lg:flex-row items-center justify-between px-6 py-16 max-w-7xl mx-auto gap-10 bg-white`}
    >
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-6">
          Make money by renting out your car
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Connect with thousands of drivers and earn more per week with Rideonix
          free fleet management tools.
        </p>
        <button
          onClick={() =>
            toast("We are working on it.", {
              icon: "🚧",
            })
          }
          className={`bg-black text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-gray-900 transition cursor-pointer`}
        >
          Get started
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1">
        <img
          src="/images/fleetmanagement.webp"
          alt="Rent out your car"
          className="w-full rounded-2xl"
        />
      </div>
    </section>
  );
};

export default RentOutSection;
