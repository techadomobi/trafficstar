"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Globe, Settings } from "lucide-react"
import Image from "next/image"

export function CampaignSection() {
  return (
    <div className="space-y-8 mt-4">
      {/* <Card>
        <div className="grid lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Kickstart your app growth</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Overcome the challenges of growing your app from scratch. Create productive ad campaigns with GROW and
              reach out to millions of users who are looking for apps like yours. Get targeted installs, achieve high
              engagement, or retain users. We have campaigns for all your marketing goals.
            </p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              Create Campaign
            </Button>
          </div>
          <div className="relative h-[300px] lg:h-full -ml-8 -mb-8">
          <Image src="/grow.png" alt="My Image" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </Card> */}

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Start faster and Scale up</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Getting app installs and engagement just got easier with GROW. Promote your app on CPI/CPE/CPA/CPR bids and
            acquire more users within your budget.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Reach a Global Audience</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get quality traffic from 5000+ apps and 300+ affiliates and acquire genuine app users who engage and retain
            in your app.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Control and Optimize</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Gain 1M+ installs per month and a detailed feedback report on your campaign data to optimize your ROI.
          </p>
        </Card>
      </div>
    </div>
  )
}
