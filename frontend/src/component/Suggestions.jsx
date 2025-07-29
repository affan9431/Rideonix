const suggestionData = [
  {
    title: "Ride",
    desc: "Go anywhere with Rideonix. Request a ride, hop in, and go.",
    img: "/images/suggestion1.png",
  },
  {
    title: "Reserve",
    desc: "Reserve your ride in advance so you can relax on the day of your trip.",
    img: "/images/suggestion2.png",
  },
  {
    title: "Intercity",
    desc: "Get convenient, affordable outstation cabs anytime at your door.",
    img: "/images/suggestion3.png",
  },
  {
    title: "Rentals",
    desc: "Request a trip for a block of time and make multiple stops.",
    img: "/images/suggestion4.png",
  },
];

const Suggestions = () => {
  return (
    <div className={`px-6 py-12 bg-white`}>
      <h2 className="text-3xl font-bold mb-8">Suggestions</h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suggestionData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-5 flex flex-col justify-between h-full w-[280px] md:w-[300px] mx-auto"
          >
            <div>
              <h3
                className="text-black
                 text-lg font-semibold mb-2"
              >
                {item.title}
              </h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>

            <div className="mt-4 flex justify-between items-end">
              <button
                className={`bg-black text-white
                 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-200 transition`}
              >
                Details
              </button>
              <img src={item.img} alt={item.title} className="w-20 h-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
