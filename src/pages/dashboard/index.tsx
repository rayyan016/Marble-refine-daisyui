import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import GraphCard from "../../components/dashboard/GraphCard";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

const filters: CrudFilter[] = [];

export const Dashboard: React.FC = () => {
  const [startDate, setStartDate] = useState(
    dayjs().subtract(12, "days").startOf("day")
  );
  const [endDate, setEndDate] = useState(dayjs().startOf("day"));

  const handleDateChange = (ranges: any) => {
    setStartDate(dayjs(ranges[0]).startOf("day"));
    setEndDate(dayjs(ranges[1]).startOf("day"));
  };

  filters[0] = {
    field: "start",
    operator: "eq",
    value: startDate.format("YYYY-MM-DD"),
  };
  filters[1] = {
    field: "end",
    operator: "eq",
    value: endDate.format("YYYY-MM-DD"),
  };

  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveBarChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New customers"
          data={memoizedNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];
  const [isTabOpen, setIsTabOpen] = useState(true); // Initial state: tab is open
  return (
    <>
      <>
        <Stats
          dailyRevenue={dailyRevenue}
          dailyOrders={dailyOrders}
          newCustomers={newCustomers}
        />
        <div className="mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md">
          <div className="flex justify-between px-4">
            <div>
              <GraphCard text="Online Store Sessions" number={255581} />
            </div>
            <div>
              <GraphCard text="Net Return Value" number={1507.44} />
            </div>
            <div>
              <GraphCard text="Total Orders" number={10511} />
            </div>
            <div>
              <GraphCard text="Conversion Rate" number={3.18} />
            </div>
            <button className="-mt-4" onClick={() => setIsTabOpen(!isTabOpen)}>
              {isTabOpen ? (
                <ChevronDownIcon className="w-8" />
              ) : (
                <ChevronUpIcon className="w-8" />
              )}
            </button>
            <DateRangePicker
              onChange={handleDateChange}
              value={[startDate.toDate(), endDate.toDate()]}
            />
          </div>
          {isTabOpen && <TabView tabs={tabs} />}
        </div>
        <RecentSales />
      </>
    </>
  );
};
