import { useState } from "react";
import { useOnboarding } from "../context/OnboardingProvider";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ur", name: "Urdu" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "fr", name: "Français (French)" },
  { code: "es", name: "Español (Spanish)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "zh", name: "中文 (Chinese)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "ko", name: "한국어 (Korean)" },
  { code: "ru", name: "Русский (Russian)" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "it", name: "Italiano (Italian)" },
  { code: "tr", name: "Türkçe (Turkish)" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)" },
  // Add more if needed
];

export default function SelectLanguage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const { driverData, setDriverData } = useOnboarding();
  const navigate = useNavigate();

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  const onContinue = async () => {
    setDriverData((prev) => ({
      ...prev,
      selectedLanguage: selected,
    }));
    navigate("/documents");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Choose your language
        </h2>

        <input
          type="text"
          placeholder="Search language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="max-h-64 overflow-y-auto space-y-2">
          {filtered.map((lang) => (
            <div
              key={lang.code}
              onClick={() => setSelected(lang.name)}
              className={`p-3 rounded-md border cursor-pointer ${
                selected === lang.name
                  ? "border-black font-medium"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {lang.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400">No matching language</p>
          )}
        </div>

        <button
          disabled={!selected}
          onClick={onContinue}
          className={`w-full mt-6 py-3 rounded-full font-semibold ${
            selected
              ? "bg-black text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
