import React, { useContext, useEffect, useState } from "react";
import { useSearchContext } from "../context/searchContext";
import { HotelContext } from "../context/hotelContext";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import PriceFilter from "../components/PriceFilter";
import FacilityFilter from "../components/FacilityFilter";
import TypeFilter from "../components/TypeFilter";

const Search = () => {
  const search = useSearchContext();
  const { searchHotel } = useContext(HotelContext);

  const [hotelData, setHotelData] = useState();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(100000);
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search?.destination,
    checkIn: search?.checkIn.toISOString(),
    checkOut: search?.checkOut.toISOString(),
    adultCount: search?.adultCount.toString(),
    childCount: search?.childCount.toString(),
    page: page?.toString(),
    stars: selectedStars,
    type: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const handleFacilityChange = (e) => {
    const facility = e.target.value;

    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );

    console.log(searchParams);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;

    setSelectedHotelTypes((prevTypes) =>
      e.target.checked
        ? [...prevTypes, type]
        : prevTypes.filter((prevType) => prevType !== type)
    );

    console.log(searchParams);
  };
  useEffect(() => {
    (async () => {
      const data = await searchHotel(searchParams);
      setHotelData(data);
    })();
  }, [
    search,
    page,
    sortOption,
    selectedPrice,
    selectedFacilities,
    selectedHotelTypes,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 bg-white p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>

          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          />
          <FacilityFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />

          <TypeFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleTypeChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>

          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>

        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
