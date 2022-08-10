import React from "react";

const TableHead = ({item}) => {
  return (
    <thead className="bg-blue-400 border-b-2 border-gray-200 hover:w-full">
				<tr>
					{item.map((el) => {
						<th
              className="p-3 text-sm font-semibold text-white tracking-wide text-left"
              key={el}
            >
              {el}
            </th>;
					})}
</tr>
    </thead>
  );
};

export default TableHead;
