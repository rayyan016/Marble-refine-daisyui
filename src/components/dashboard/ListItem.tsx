import React from "react";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

interface ListItemProps {
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-between mb-2 w-[15rem] rounded-md px-2 py-1 mr-8 text-sm hover:bg-slate-200">
      <div className="flex">
        <ChartBarIcon className="h-6 w-6 mr-2 text-gray-500" />
        <div className="text- font-medium">{text}</div>
      </div>
      <QuestionMarkCircleIcon className="h-6 w-6 ml-2 text-gray-500" />
    </div>
  );
};

export default ListItem;
