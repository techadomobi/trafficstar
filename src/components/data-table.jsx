"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Settings,
  Download,
  RotateCw,
  Pin,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Popover, PopoverPanel, Transition } from "@headlessui/react";

export function DataTable() {
  const headers = [
    "Date",
    "Clicks",
    "Conversions",
    "Spends",
    "Cost Per Conversion",
    "Conversion Rate",
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);
  const popoverButtonRef = useRef(null);

  useEffect(() => {
    const initialDate = new Date();
    setCurrentMonth(initialDate);
    setStartDate(new Date(2025, 0, 21));
    setEndDate(new Date(2025, 0, 27));

    const handleClickOutside = (event) => {
      if (
        popoverButtonRef.current &&
        !popoverButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateClick = (date) => {
    if (!date) return;

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date > startDate) {
        setEndDate(date);
        setOpen(false);
      } else {
        setStartDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const prevDate = new Date(prevMonth);
      prevDate.setMonth(prevDate.getMonth() - 1);
      return prevDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextDate = new Date(prevMonth);
      nextDate.setMonth(nextDate.getMonth() + 1);
      return nextDate;
    });
  };

  const handleCalendarClick = () => {
    setOpen((prev) => !prev);
  };

  const getFormattedDateRange = () => {
    if (!startDate) return "Select Date";
    if (startDate && !endDate)
      return `${startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} -`;

    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}, ${endDate.getFullYear()}`;
  };

  const generateCalendarDates = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfWeek = lastDayOfMonth.getDay();

    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push(day);
    }

    for (let i = lastDayOfWeek; i < 6; i++) {
      days.push(null);
    }
    return days;
  };

  const days = currentMonth ? generateCalendarDates() : [];

  return (
    <div className="rounded-md shadow-md border border-gray-200 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Popover className="relative">
            <div ref={popoverButtonRef} onClick={handleCalendarClick}>
                <Button variant="outline" className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900 rounded-md border border-orange-200 dark:border-orange-700">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500 dark:text-orange-400" />
                    {getFormattedDateRange()}
                </Button>
            </div>
              <Transition
                  show={open}
                  as="div"
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                  >
                <PopoverPanel className="absolute z-20 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-gray-300 dark:bg-gray-700 dark:ring-gray-600 p-2">
                    <div className="flex items-center justify-between mb-2">
                      <Button variant="ghost" onClick={handlePrevMonth} className="h-8 w-8 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </Button>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentMonth
                          ? currentMonth.toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })
                          : "Loading..."}
                      </span>
                      <Button variant="ghost" onClick={handleNextMonth} className="h-8 w-8 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md">
                        <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Su</span>
                      <span className="font-medium">Mo</span>
                      <span className="font-medium">Tu</span>
                      <span className="font-medium">We</span>
                      <span className="font-medium">Th</span>
                      <span className="font-medium">Fr</span>
                      <span className="font-medium">Sa</span>
                      {days.map((day, index) =>
                        day ? (
                          <button
                            type="button"
                            key={day.getTime()}
                            onClick={() => handleDateClick(day)}
                            className={`rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600
                                ${
                                  startDate &&
                                  day >= startDate &&
                                  (!endDate || day <= endDate)
                                    ? "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100"
                                    : ""
                                }
                                ${
                                  startDate &&
                                  day.getDate() === startDate.getDate() &&
                                  day.getMonth() === startDate.getMonth()
                                    ? "font-medium text-orange-600 dark:text-orange-100"
                                    : ""
                                }
                                ${
                                  endDate &&
                                  day.getDate() === endDate.getDate() &&
                                  day.getMonth() === endDate.getMonth()
                                    ? "font-medium text-green-600 dark:text-green-100"
                                    : ""
                                }
                              `}
                          >
                            {day.getDate()}
                          </button>
                        ) : (
                          <span
                            key={`empty-${index}`}
                            className="block w-full h-8"
                          ></span>
                        )
                      )}
                    </div>
                </PopoverPanel>
              </Transition>
          </Popover>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="text-gray-700 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-orange-900 rounded-md border border-orange-200 dark:border-orange-700"
          >
            <Settings className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            <span className="ml-1">Settings</span>
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-orange-900 rounded-md"
          >
            <Download className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </Button>
          <Button
            variant="ghost"
             className="text-gray-700 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-orange-900 rounded-md"
          >
            <RotateCw className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </Button>
        </div>
      </div>

        <div className="px-4 py-2 flex justify-between border-b dark:border-gray-700">
            {headers.map((header) => (
            <div key={header} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Pin className="w-3 h-3 text-gray-400 mr-1 dark:text-gray-400" />
                <Filter className="w-3 h-3 text-gray-400 mr-1 dark:text-gray-400" />
                {header}
                {header === "Date" && (
                <ChevronDown className="w-3 h-3 text-gray-400 ml-1 dark:text-gray-400" />
                )}
            </div>
            ))}
        </div>

      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.158 5.159m-1.5-1.5l1.5 1.5"
          />
        </svg>
        No stats data
      </div>

      <div className="flex items-center justify-between p-4 border-t dark:border-gray-700 text-gray-500 dark:text-gray-400">
          <span>
              Rows per page:{" "}
            <select
              name=""
              id=""
              className="bg-transparent focus:outline-none focus:ring-0"
            >
              <option value="20">20</option>
            </select>
          </span>
          <div className="flex items-center space-x-2">
              <span>0-0 of 0</span>
            <ChevronLeft className="w-4 h-4 cursor-pointer" />
            <ChevronRight className="w-4 h-4 cursor-pointer" />
          </div>
      </div>
    </div>
  );
}
