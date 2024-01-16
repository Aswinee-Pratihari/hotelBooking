import React, { useContext, useEffect, useState } from "react";
import { useSearchContext } from "../context/searchContext";
import { HotelContext } from "../context/hotelContext";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const search = useSearchContext();
  const { searchHotel } = useContext(HotelContext);

  const [hotelData, setHotelData] = useState();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search?.destination,
    checkIn: search?.checkIn.toISOString(),
    checkOut: search?.checkOut.toISOString(),
    adultCount: search?.adultCount.toString(),
    childCount: search?.childCount.toString(),
    page: page?.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  useEffect(() => {
    (async () => {
      const data = await searchHotel(searchParams);
      setHotelData(data);
    })();
  }, [search, page]);
  console.log(hotelData);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>

          {/* SORT OPTIONS */}
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
