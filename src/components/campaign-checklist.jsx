// components/campaign-checklist.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ChevronDown, Info } from "lucide-react";
import Link from "next/link"; // Import Link component


export function CampaignChecklist() {
  const steps = [
    { name: "Create Campaign", progress: "0/2", active: true },
    { name: "Complete Account Setup", progress: "0/2", active: false },
    { name: "Add Payment Method", progress: "", active: false },
    { name: "Launch Your Campaign", progress: "0/2", active: false },
    { name: "Review Campaign Performance", progress: "", active: false },
  ];

  return (
    <Card className="mt-8 border-2 border-emerald-500 overflow-hidden rounded-md">
      <div className="grid lg:grid-cols-2">
        {/* Left Panel - Steps */}
        <div className="border-r">
          {steps.map((step, index) => (
            <div
              key={step.name}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                step.active ? "bg-gray-50 dark:bg-gray-800" : ""
              } ${index !== steps.length - 1 ? "border-b" : ""}`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-gray-100">{step.name}</span>
              </div>
              {step.progress && <span className="text-sm text-gray-500">{step.progress}</span>}
            </div>
          ))}
        </div>

        {/* Right Panel - Details */}
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Campaign</h3>
            <Button variant="ghost" size="sm" className="text-orange-600">
              Learn More
            </Button>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Make sure to create one campaign targeting Desktop and a separate campaign targeting Mobile. Each platform
            typically requires a different bid amount.
          </p>

          <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <p className="text-sm text-orange-600 dark:text-orange-400">
              You're so close! Create your first campaign and get access to 500 million daily active users.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">1/1</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  Previous
                </Button>
                <span className="text-gray-300">|</span>
                <Button variant="ghost" size="sm" className="text-orange-600 dark:text-orange-400">
                  Next Step
                </Button>
              </div>
            </div>
            <Link href="/admin/create-campaign"> 
             <Button className="bg-emerald-500 hover:bg-emerald-600">Create Campaign</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
