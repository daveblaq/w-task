import React, { useEffect } from "react";

const Pagination = () => {
  // useEffect(() => {
  //   if (slice.length < 1 && page !== 1) {
  //     setPage(page - 1);
  //   }
  // }, [slice, page, setPage]);
  return (
    <div className="my-8 flex items-end justify-end pr-3">
      {/* {range.map((el, index) => ( */}
      <div className={`px-5 py-2 bg-blue-400`}>
        <h2 className="text-sm text-wh"> Prev </h2>
      </div>
      <div className={`px-5 py-2 bg-gray-100`}>
        <h2 className="text-sm text-black"> Next </h2>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Pagination;
