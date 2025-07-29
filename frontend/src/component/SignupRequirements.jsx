import React, { useState } from "react";

const SignupRequirements = () => {
  const [activeTab, setActiveTab] = useState("drive");

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Here's what you need to sign up
      </h2>

      {/* Tabs */}
      <div className="flex justify-center border-b mb-6">
        <button
          onClick={() => setActiveTab("drive")}
          className={`px-4 py-2 font-semibold border-b-4 cursor-pointer ${
            activeTab === "drive" ? "border-black" : "border-transparent"
          }`}
        >
          To drive
        </button>
        <button
          onClick={() => setActiveTab("deliver")}
          className={`px-4 py-2 font-semibold border-b-4 cursor-pointer ${
            activeTab === "deliver" ? "border-black" : "border-transparent"
          }`}
        >
          To deliver
        </button>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Requirements */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Be at least 18 years old</li>
            <li>Clear a background screening</li>
          </ul>
        </div>

        {/* Documents */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Documents</h3>
          <ul className="list-disc list-inside space-y-1">
            {activeTab === "drive" ? (
              <>
                <li>Valid driver's license (private or commercial)</li>
                <li>Proof of residency in your city, state or province</li>
                <li>
                  Car documents such as commercial insurance, registration
                  certificate, permit
                </li>
              </>
            ) : (
              <>
                <li>Valid driver's license</li>
                <li>
                  Proof of residency in your city, state or province like Pan
                  Card
                </li>
                <li>
                  Vehicle documents such as insurance, registration certificate
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Signup Process */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Signup process</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Visit the nearest Partner Seva Kendra in your city</li>
            <li>Submit documents and photo</li>
            <li>Provide information for a background check</li>
          </ul>
        </div>
      </div>

      {activeTab === "deliver" && (
        <p className="mt-6 text-blue-600 underline">
          How to sign up to deliver
        </p>
      )}
    </section>
  );
};

export default SignupRequirements;
