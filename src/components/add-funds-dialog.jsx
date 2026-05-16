"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DollarSign, IndianRupee } from "lucide-react" // Import icons for currency

export function AddFundsDialog({ open, onOpenChange }) {
  const [amount, setAmount] = React.useState("0")
  // In a real app, these would likely come from an API or configuration
  const conversionRate = 86.602
  const gstRate = 0.18 // 18%

  const parsedAmount = Number.parseFloat(amount || "0");
  const fundsInINR = parsedAmount * conversionRate;
  const gstAmount = fundsInINR * gstRate;
  const totalAmount = fundsInINR + gstAmount;

  // Function to handle adding funds (placeholder)
  const handleAddFunds = () => {
    console.log("Adding funds:", {
      amountUSD: parsedAmount,
      fundsINR: fundsInINR,
      gst: gstAmount,
      totalINR: totalAmount,
    });
    // Here you would integrate with your payment gateway
    // On success: onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-50 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/path-to-subtle-pattern.svg')] opacity-5 -z-10 animate-pulse"></div> {/* Optional: Add a subtle pattern */}

        <DialogHeader className="p-6 pb-4 border-b border-gray-200/50 bg-gradient-to-r from-orange-500/10 to-orange-500/10 backdrop-blur-sm">
          <DialogTitle className="flex justify-between items-center text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-orange-700">
            <span>Add Funds to Wallet</span>
            <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full shadow-inner flex items-center gap-1">
              Available: <DollarSign className="w-4 h-4 text-green-600" />{(0.00).toFixed(2)}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-medium text-gray-800">Enter Amount (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <DollarSign className="w-5 h-5" />
              </span>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-4 py-2 text-lg font-bold border-2 border-orange-300 focus:border-orange-500 rounded-xl shadow-inner transition-all duration-200 focus:ring-2 focus:ring-orange-200"
                placeholder="e.g., 100"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white shadow-lg border border-gray-200 animate-fade-in">
            <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="p-2 bg-orange-100 rounded-full">
                <IndianRupee className="w-5 h-5 text-orange-600" />
              </span>
              Payment Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-700">Funds to be added (USD)</span>
                <span className="font-semibold text-gray-900">$ {parsedAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-700">Equivalent in INR</span>
                <span className="font-semibold text-gray-900">₹ {fundsInINR.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-700">GST (18%)</span>
                <span className="font-semibold text-gray-900">₹ {gstAmount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 italic pt-1">
                Applied Conversion Rate: $1 = ₹ {conversionRate.toFixed(3)}
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-orange-200/50 font-bold text-xl text-gray-900">
                <span>Total Payable</span>
                <span className="flex items-center gap-1 text-orange-700">
                  <IndianRupee className="w-5 h-5" /> {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="coupon" className="border-orange-400 data-[state=checked]:bg-orange-600 data-[state=checked]:text-white" />
            <Label htmlFor="coupon" className="text-gray-700 font-medium cursor-pointer">I have a coupon code</Label>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 p-6 pt-4 border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-sm">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Cancel
          </Button>
          <Button
            type="button" // Change to type="button" to prevent form submission if not wrapped in <form>
            onClick={handleAddFunds}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-600 text-white font-semibold text-lg shadow-lg hover:from-orange-700 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            Add Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
