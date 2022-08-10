import React, { useEffect, useState } from "react";
import { RiSoundModuleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filmHeader,
  peopleHeader,
  planetsHeader,
  speciesHeader,
  starshipsHeader,
  vehiclesHeader,
} from "../components/data/headerData";
import Filter from "../components/Home/Filter";
import Pagination from "../components/Home/Pagination";
import SearchBox from "../components/Home/SearchBox";
import {
  clearState,
  fetchData,
  userSelector,
} from "../components/redux/slices/dataReducer";

const HomePage = () => {
  const [filterValue, setFilterValue] = useState("Films");
  const filters = [
    "Films",
    "People",
    "Planets",
    "Species",
    "Starships",
    "Vehicles",
  ];
  const [headers, setHeaders] = useState([]);

  // Type variable to store different array for different Table Header
  // let type = null;

  // This will be used to create set of options that user will see
  // let options = null;

  // Setting Type variable according to Filter dropdown
  // if (filterValue === "Films") {
  //   type = filmHeader;
  // } else if (filterValue === "People") {
  //   type = peopleHeader;
  // } else if (filterValue === "Planets") {
  //   type = planetsHeader;
  // } else if (filterValue === "Species") {
  //   type = speciesHeader;
  // } else if (filterValue === "Starships") {
  //   type = starshipsHeader;
  // } else if (filterValue === "Vehicles") {
  //   type = vehiclesHeader;
  // }

  // if (type) {
  //   options = type.map((el) => (
  //     <th
  //       className="p-3 text-sm font-semibold text-white tracking-wide text-left"
  //       key={el}
  //     >
  //       {el}
  //     </th>
  //   ));
  // }

  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const { feeds } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchData(filterValue.toLowerCase()));
  }, [dispatch, filterValue]);

  useEffect(() => {
    if (feeds) {
      setHeaders([]);
      Object.entries(feeds.payload.results[0]).forEach(([key]) => {
        setHeaders((prevState) => [...prevState, key]);
      });
    }
  }, [feeds]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, dispatch]);

  const search = (value) => {
    console.log(value);
  };

  const TableHead = () => {
    return (
      <thead className="bg-blue-400 border-b-2 border-gray-200 hover:w-full">
        <tr>
          {headers.map((header) => {
            return (
              <th
                className="p-3 text-sm font-semibold text-white tracking-wide text-left capitalize"
                key={header}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  return (
    <>
      <div className="p-1 min-h-screen w-full py-5 grid items-center justify-items-center">
        <div
          className="overflow-hidden w-full rounded-xl shadow"
          style={{ width: "90%" }}
        >
          <SearchBox handleSearch={search} />
          <div className="flex items-center justify-between px-3 py-4">
            <h1 className="text-black-500 text-xl">All {filterValue}</h1>
            <div className="px-2 py-2 bg-blue-50 rounded-md flex">
              <RiSoundModuleLine size={18} className="text-sm text-blue-400" />

              <select
                className="bg-blue-50 outline-none"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              >
                <option disabled>Filter By</option>
                {filters.map((filter, index) => (
                  <Filter item={filter} key={index} />
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2 my-2 max-w-full w-full overflow-auto">
            <table className="table-auto w-full hover:w-full ">
              <TableHead />
              <tbody className="divide-y divide-blue-200 divide-dashed">
                {feeds &&
                  feeds.payload.results.map((feed, index) => (
                    <tr
                      className="bg-white even:bg-gray-50 max-w-full"
                      key={index}
                    >
                      {headers.map((fd, i) => (
                        <td
                          key={fd + i}
                          className="p-3 text-sm max-w-xs whitespace-nowrap overflow-auto text-gray-700"
                        >
                          {Array.isArray(feed[fd])
                            ? feed[fd].map((value, i) => {
                                if (value.includes("https://")) {
                                  return (
                                    <span key={value}>
                                      <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {value}
                                      </a>
                                      <span>;&nbsp;</span>
                                    </span>
                                  );
                                }
                                return (
                                  <span key={value}>
                                    <span>{value};&nbsp;</span>
                                  </span>
                                );
                              })
                            : feed[fd]}
                        </td>
                      ))}
                      {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {feed.title}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {feed.director}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {feed.producer}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {feed.release_date}
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default HomePage;
