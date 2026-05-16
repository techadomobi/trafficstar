"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function StatsCard({ title, today, yesterday, unit }) {
  return (
    <Card className="shadow-lg border border-emerald-500 rounded-xl hover:shadow-xl transition-all">
      <CardContent className="p-8 pl-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">{title}</span>
          <ArrowUpRight className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-4xl font-extrabold text-orange-600 flex items-baseline justify-between">
          {today}
          <span className="text-sm text-gray-600 dark:text-gray-300 font-normal">{unit}</span>
        </div>
        <div className="mt-4 flex flex-col space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="text-gray-500">Yesterday</span>
            <span className="font-medium text-gray-800 dark:text-white">{yesterday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">This Week</span>
            <span className="font-medium text-gray-800 dark:text-white">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">MTD</span>
            <span className="font-medium text-gray-800 dark:text-white">0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

