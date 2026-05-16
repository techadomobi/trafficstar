"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

const campaigns = [
  {
    id: "886761",
    status: "Draft",
    name: "hshsxh",
    adFormat: "Look-alike",
    audience: "Popunder",
    imprs: 0,
    ecpm: 0.0,
    clicks: 0,
    ctr: 0.0,
    ecpc: 0.0,
    leads: 0,
    ecpa: 0.0,
    costs: 0.0,
    earnings: 0.0,
  },
  {
    id: "886760",
    status: "Draft",
    name: "yetsts",
    adFormat: "Look-alike",
    audience: "Popunder",
    imprs: 0,
    ecpm: 0.0,
    clicks: 0,
    ctr: 0.0,
    ecpc: 0.0,
    leads: 0,
    ecpa: 0.0,
    costs: 0.0,
    earnings: 0.0,
  },
  {
    id: "886757",
    status: "Draft",
    name: "tests",
    adFormat: "Look-alike",
    audience: "Image 300x250",
    imprs: 0,
    ecpm: 0.0,
    clicks: 0,
    ctr: 0.0,
    ecpc: 0.0,
    leads: 0,
    ecpa: 0.0,
    costs: 0.0,
    earnings: 0.0,
  },
  {
    id: "886490",
    status: "Pending",
    name: "test",
    adFormat: "Look-alike",
    audience: "Image Native",
    imprs: 0,
    ecpm: 0.0,
    clicks: 0,
    ctr: 0.0,
    ecpc: 0.0,
    leads: 0,
    ecpa: 0.0,
    costs: 0.0,
    earnings: 0.0,
  },
  {
    id: "886487",
    status: "Draft",
    name: "tests",
    adFormat: "Look-alike",
    audience: "Image 300x250",
    imprs: 0,
    ecpm: 0.0,
    clicks: 0,
    ctr: 0.0,
    ecpc: 0.0,
    leads: 0,
    ecpa: 0.0,
    costs: 0.0,
    earnings: 0.0,
  },
]

export function CampaignAnalytics() {
  const [archivedCampaigns, setArchivedCampaigns] = useState(false)
  const [selectedCampaigns, setSelectedCampaigns] = useState([])

  const totals = campaigns.reduce(
    (acc, campaign) => ({
      imprs: acc.imprs + campaign.imprs,
      ecpm: acc.ecpm + campaign.ecpm,
      clicks: acc.clicks + campaign.clicks,
      ctr: acc.ctr + campaign.ctr,
      ecpc: acc.ecpc + campaign.ecpc,
      leads: acc.leads + campaign.leads,
      ecpa: acc.ecpa + campaign.ecpa,
      costs: acc.costs + campaign.costs,
      earnings: acc.earnings + campaign.earnings,
    }),
    {
      imprs: 0,
      ecpm: 0,
      clicks: 0,
      ctr: 0,
      ecpc: 0,
      leads: 0,
      ecpa: 0,
      costs: 0,
      earnings: 0,
    },
  )

  return (
    <div className="space-y-6">
      {/* Date Range and Archive Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            January 01, 2025 - February 01, 2025
          </Button>
          <div className="flex items-center gap-2">
            <Checkbox
              id="archived"
              checked={archivedCampaigns}
              onCheckedChange={(checked) => setArchivedCampaigns(checked)}
            />
            <label htmlFor="archived" className="text-sm text-gray-600 dark:text-gray-400">
              Archived campaigns
            </label>
          </div>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">Show</Button>
      </div>

      {/* Grand Total Card */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">GRAND TOTAL</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IMPRS</TableHead>
              <TableHead>ECPM</TableHead>
              <TableHead>CLICKS</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>ECPC</TableHead>
              <TableHead>LEADS</TableHead>
              <TableHead>ECPA</TableHead>
              <TableHead>COSTS (USD)</TableHead>
              <TableHead>EARNINGS (USD)</TableHead>
              <TableHead>ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{totals.imprs}</TableCell>
              <TableCell>{totals.ecpm.toFixed(3)}</TableCell>
              <TableCell>{totals.clicks}</TableCell>
              <TableCell>{totals.ctr.toFixed(2)}</TableCell>
              <TableCell>{totals.ecpc.toFixed(3)}</TableCell>
              <TableCell>{totals.leads}</TableCell>
              <TableCell>{totals.ecpa.toFixed(3)}</TableCell>
              <TableCell>{totals.costs.toFixed(2)}</TableCell>
              <TableCell>{totals.earnings.toFixed(2)}</TableCell>
              <TableCell>0%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCampaigns.length === campaigns.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCampaigns(campaigns.map((c) => c.id))
                    } else {
                      setSelectedCampaigns([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>AD FORMAT</TableHead>
              <TableHead>AUDIENCE</TableHead>
              <TableHead className="text-right">IMPRS</TableHead>
              <TableHead className="text-right">ECPM</TableHead>
              <TableHead className="text-right">CLICKS</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">ECPC</TableHead>
              <TableHead className="text-right">LEADS</TableHead>
              <TableHead className="text-right">ECPA</TableHead>
              <TableHead className="text-right">COSTS (USD)</TableHead>
              <TableHead className="text-right">EARNINGS (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                className={campaign.status === "Pending" ? "bg-red-50 dark:bg-red-900/20" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedCampaigns.includes(campaign.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCampaigns([...selectedCampaigns, campaign.id])
                      } else {
                        setSelectedCampaigns(selectedCampaigns.filter((id) => id !== campaign.id))
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      campaign.status === "Draft"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 text-xs">
                    {campaign.adFormat}
                  </span>
                </TableCell>
                <TableCell>{campaign.audience}</TableCell>
                <TableCell className="text-right">{campaign.imprs}</TableCell>
                <TableCell className="text-right">{campaign.ecpm.toFixed(3)}</TableCell>
                <TableCell className="text-right">{campaign.clicks}</TableCell>
                <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{campaign.ecpc.toFixed(3)}</TableCell>
                <TableCell className="text-right">{campaign.leads}</TableCell>
                <TableCell className="text-right">{campaign.ecpa.toFixed(3)}</TableCell>
                <TableCell className="text-right">{campaign.costs.toFixed(2)}</TableCell>
                <TableCell className="text-right">{campaign.earnings.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-50 dark:bg-gray-800/50 font-medium">
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell className="text-right">{totals.imprs}</TableCell>
              <TableCell className="text-right">{totals.ecpm.toFixed(3)}</TableCell>
              <TableCell className="text-right">{totals.clicks}</TableCell>
              <TableCell className="text-right">{totals.ctr.toFixed(2)}%</TableCell>
              <TableCell className="text-right">{totals.ecpc.toFixed(3)}</TableCell>
              <TableCell className="text-right">{totals.leads}</TableCell>
              <TableCell className="text-right">{totals.ecpa.toFixed(3)}</TableCell>
              <TableCell className="text-right">{totals.costs.toFixed(2)}</TableCell>
              <TableCell className="text-right">{totals.earnings.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">Showing 1 to 5 of 5 entries</div>
      </Card>
    </div>
  )
}


