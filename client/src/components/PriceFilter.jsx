import React from "react";

const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div>
        <label htmlFor="input" className="text-lg text-blue-600">
          Price:
        </label>
        <div className="flex justify-between items-center  gap-5">
          <input
            type="range"
            id="range"
            value={selectedPrice}
            max={100000}
            step={200}
            min={100}
            onChange={onChange}
            className="w-full mt-2 appearance-none bg-blue-200 h-4 rounded-full outline-none"
          />
          <span className="font-semibold">{selectedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
