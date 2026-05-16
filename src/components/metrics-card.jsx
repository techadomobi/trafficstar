
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function MetricsCard({ cardType }) {
    const cardData = {
        OFFERWALL: {
            title: "OFFERWALL",
            revenue: "$0.00",
            activeOfferwalls: 1,
            metrics: [
                { label: "DAU", value: "0" },
                { label: "Open Rate", value: "0.00%" },
                { label: "ARPM", value: "$0.00" },
            ],
            additionalContent: (
              <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Key Benefits
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li><span className="text-orange-500">Global demand</span> access.</li>
                      <li><span className="text-green-500">Real-time bidding</span> for optimal yield.</li>
                      <li><span className="text-orange-500">Detailed analytics</span> for insights.</li>
                      <li><span className="text-orange-500">Dedicated support</span> to maximize performance.</li>
                  </ul>
                  <button className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                      Learn More
                  </button>
              </div>
          ),
        },
        ADX: {
            title: <span className="text-green-500">Monetize with Trackstart</span>,
            description: "Unlock premium ad revenue with Google Ad Exchange. Get access to global demand, real-time bidding, and expert support.",
            metrics: [
                { label: "eCPM", value: "$0.00", color: "text-green-500" },
                { label: "Fill Rate", value: "0.00%", color: "text-orange-500" },
                { label: "Revenue", value: "$0.00", color: "text-orange-500" },
                { label: "Est. Revenue", value: "$0.00", color: "text-yellow-500" },
            ],
            additionalContent: (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Key Benefits
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li><span className="text-orange-500">Global demand</span> access.</li>
                        <li><span className="text-green-500">Real-time bidding</span> for optimal yield.</li>
                        <li><span className="text-orange-500">Detailed analytics</span> for insights.</li>
                        <li><span className="text-orange-500">Dedicated support</span> to maximize performance.</li>
                    </ul>
                    <button className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                </div>
            ),
        },
    };

    const card = cardData[cardType];

    if (!card) {
        return null; // Or handle the case where the card type is invalid
    }


        const renderTitle = () => {
          if (typeof card.title === "string") {
              if (card.title === "OFFERWALL") {
                  return (
                      <>
                          <span className="text-green-500 dark:text-green-400">SPENT</span>
                          <span>WALL</span>
                      </>
                  );
              }
              return <span className="text-gray-800 dark:text-gray-100">{card.title}</span>;
          } else {
              return card.title; // Render if it's already a React element
          }
      };


    return (
        <Card className="overflow-hidden shadow-md dark:bg-gray-800">
             <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    {renderTitle()}
                </CardTitle>
                {card.revenue && (
                    <div className="space-y-2">
                        <p className="text-sm text-orange-500 dark:text-orange-400">
                            Revenue in last 7 Days
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {card.revenue}
                        </p>
                        {card.activeOfferwalls && (
                            <p className="text-sm text-orange-500 dark:text-orange-400">
                                {card.activeOfferwalls} Active Offerwalls
                            </p>
                        )}
                    </div>
                )}
                {card.description && (
                    <p className="text-sm text-orange-500 dark:text-orange-400 mt-2">
                        {card.description}
                    </p>
                )}
            </CardHeader>
             <CardContent>
                {card.metrics && card.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {card.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="border rounded-md p-2 dark:border-gray-700"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {metric.label}
                                </p>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {metric.value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                {card.additionalContent}
                {!card.additionalContent && (
                    <Button
                        variant="link"
                        className="px-0 text-orange-500 dark:text-orange-400 hover:no-underline"
                    >
                        Know More <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
