import React from "react";
import { Rating } from "react-simple-star-rating";

export const RatingStar = ({ isReview, setIsReview }) => {
  const handleRating = (rate) => {
    const ratingValue = rate / 1;
    setIsReview((prev) => ({
      ...prev,
      rating: ratingValue.toString(),
    }));
    console.log({ rating: ratingValue }, "Updated rating");
  };

  return (
    <div className="!mt-1">
      <Rating
        onClick={handleRating}
        ratingValue={(Number(isReview.rating || 0)) * 5}
        initialValue={0}
        size={30}
        fillColor="orange"
        emptyColor="transparent"
        allowHover={false}
        className="flex custom-rating"
      />
    </div>
  );
};
