import { Calendar, DollarSign, MessageSquare } from "lucide-react";

export default function WhyDriveWithUs() {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">
          Why drive with us
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-10">
          <img
            src="/images/whyDriveWithUs_desktop.jpg"
            alt="Why Drive With Us"
            className="w-full max-w-4xl"
          />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div className="flex flex-col items-start">
            <Calendar className="w-6 h-6 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Set your own hours</h3>
            <p className="text-gray-700">
              You decide when and how often you drive.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <DollarSign className="w-6 h-6 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Get paid fast</h3>
            <p className="text-gray-700">
              Weekly payments in your bank account.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <MessageSquare className="w-6 h-6 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Get support at every turn
            </h3>
            <p className="text-gray-700">
              If there’s anything that you need, you can reach us anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
