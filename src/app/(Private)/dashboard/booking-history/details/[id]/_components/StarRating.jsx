import { useState } from "react";

const StarRating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Rating <span className="text-red-500">*</span></label>
      <div className="flex items-center gap-1">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className="cursor-pointer text-yellow-400 text-5xl"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            >
              {starValue <= (hoverRating || rating)
                ? "★"
                : "☆"}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;