// Star.js

import React from "react";

const Star = ({ filled }) => {
  return (
    <span style={{ color: filled ? "gold" : "lightgray" }} className="text-xl">
      &#9733;
    </span>
  );
};

export default Star;
