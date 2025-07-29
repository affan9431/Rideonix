import { Star } from "lucide-react";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
        }`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
}

export default StarRating;
