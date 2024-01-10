import React from "react";
import Star from "./Star";

const StarRating = ({ totalStars = 5, selectedStars }) => {
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <Star key={index} filled={index < selectedStars} />
  ));

  return <div>{stars}</div>;
};

export default StarRating;
