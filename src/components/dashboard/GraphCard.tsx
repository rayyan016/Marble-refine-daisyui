import React, { useState } from "react";
import {
  PencilIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import ListItem from "./ListItem";

interface CardProps {
  text: string;
  number: number;
}

const items = [
  "Average Order Value",
  "Conversion Rate",
  "Gross Sales",
  "Net Return Value",
  "Store Search Conversion",
  "Return Rate",
];

const GraphCard: React.FC<CardProps> = ({ text, number }) => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

  const handlePencilClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card shadow-sm rounded-xl p-4 flex items-center justify-between hover:bg-[#F1F1F1]">
      <div className="flex items-center">
        <span className="text-base font-medium underline decoration-dashed decoration-[#CCCCCC] underline-offset-4 mr-2">
          {text}
        </span>
        <button type="button" onClick={handlePencilClick}>
          <PencilIcon className="h-5 w-5 ml-12 text-gray-500 hover:text-gray-700" />
        </button>
        {isOpen && (
          <div className="absolute right-0 left-28 top-12 mt-1 px-2 py-2  w-64 rounded-md shadow-sm text-gray-500 bg-white z-50">
            <div className="container">
              {items.map((item) => (
                <ListItem key={item} text={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="text-lg font-medium mr-auto mt-2 flex">
        {number.toLocaleString()} <ChevronUpIcon className="h-4 mt-1.5 ml-2" />{" "}
        <span className="text-sm mt-1">7%</span>
      </span>
    </div>
  );
};

export default GraphCard;
