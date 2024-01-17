import { createContext, useContext, useState } from "react";

const SearchContext = createContext(undefined);

export const SearchProvider = ({ children }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultGuest, setAdultGuest] = useState(1);
  const [childGuest, setChildGuest] = useState(0);
  const [hotelId, setHotelId] = useState("");
  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultGuest,
    childGuest,
    hotelId = ""
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setChildGuest(childGuest);
    setAdultGuest(adultGuest);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,

        adultGuest,
        childGuest,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
