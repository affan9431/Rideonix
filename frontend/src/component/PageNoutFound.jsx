import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="relative min-h-screen bg-black text-lime-300 font-mono overflow-hidden">
      {/* Noise Background */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage:
            'url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Scan Line Overlay */}
      <div className="overlay absolute inset-0 z-10 pointer-events-none">
        <div
          className="w-full h-full bg-[length:auto_4px] bg-repeat-y"
          style={{
            backgroundImage: `repeating-linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 animate-scan z-20"
          style={{
            backgroundImage: `linear-gradient(
            0deg,
            transparent 0%,
            rgba(32, 128, 32, 0.2) 2%,
            rgba(32, 128, 32, 0.8) 3%,
            rgba(32, 128, 32, 0.2) 3%,
            transparent 100%)`,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Terminal Content */}
      <div className="relative z-30 max-w-3xl mx-auto px-4 py-24 text-shadow">
        <h1 className="text-4xl md:text-6xl font-bold uppercase">
          Error <span className="text-white">404</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl before:content-['>_']">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="mt-4 text-lg md:text-xl before:content-['>_']">
          Please try to{" "}
          <Link
            to="/app/home"
            className="text-white hover:underline before:content-['['] after:content-[']']"
          >
            return to the homepage
          </Link>
          .
        </p>
        <p className="mt-4 text-lg md:text-xl before:content-['>_']">
          Good luck.
        </p>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes scan {
            0% { background-position: 0 -100vh; }
            35%, 100% { background-position: 0 100vh; }
          }
          .animate-scan {
            animation: scan 7.5s linear infinite;
          }
          .text-shadow {
            text-shadow:
              0 0 1px rgba(51, 255, 51, 0.4),
              0 0 2px rgba(255, 255, 255, 0.8);
          }
        `}
      </style>
    </div>
  );
}
