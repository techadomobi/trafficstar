"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRightSquare, DollarSign, Wallet, CircleDollarSign, History, Star, Shield, Gem } from "lucide-react"; // Added new icons
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // For conditional styling
import { AddFundsDialog } from "./add-funds-dialog"; // Import the AddFundsDialog

export default function WalletPage() {
    // Hardcoded static data for UI design purposes
    const balance = 0.00; // Example balance
    const transactions = [
        {
            id: 'txn_001',
            date: '2023-10-26T10:30:00Z',
            type: 'deposit',
            amount: 500.00,
            status: 'completed',
            description: 'Funds added via Bank Transfer',
        },
        {
            id: 'txn_002',
            date: '2023-10-25T14:15:00Z',
            type: 'spend',
            amount: -50.25,
            status: 'completed',
            description: 'Campaign #1234 Spend',
        },
        {
            id: 'txn_003',
            date: '2023-10-24T09:00:00Z',
            type: 'deposit',
            amount: 1000.00,
            status: 'completed',
            description: 'Top-up from PayPal',
        },
        {
            id: 'txn_004',
            date: '2023-10-23T16:45:00Z',
            type: 'withdrawal',
            amount: -200.00,
            status: 'pending',
            description: 'Withdrawal request to Bank',
        },
        {
            id: 'txn_005',
            date: '2023-10-22T11:00:00Z',
            type: 'spend',
            amount: -25.75,
            status: 'completed',
            description: 'Campaign #5678 Spend',
        },
         {
            id: 'txn_006',
            date: '2023-10-21T18:00:00Z',
            type: 'deposit',
            amount: 250.00,
            status: 'failed',
            description: 'Card deposit failed',
        },
    ];

    const isLoading = false;
    const error = null;
    const [showAddFunds, setShowAddFunds] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200">
                <CardHeader className="p-6 bg-white border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-600 rounded-lg shadow-md">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl text-gray-800 font-bold">
                                My Wallet
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                                Manage your funds and view transaction history.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6 md:p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md animate-fade-in-down">
                            <p className="font-bold">Error!</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                           <svg className="animate-spin h-10 w-10 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="ml-4 text-lg text-gray-700">Loading wallet data...</span>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                <Card className="lg:col-span-1 p-6 flex flex-col justify-center bg-orange-50 border border-orange-200 rounded-lg shadow-sm">
                                    <div className="flex items-center text-orange-800 mb-2">
                                        <CircleDollarSign className="w-7 h-7 mr-3" />
                                        <CardTitle className="text-lg font-semibold">Current Balance</CardTitle>
                                    </div>
                                    <p className="text-5xl font-bold text-orange-900 mt-2">
                                        ${typeof balance === 'number' ? balance.toFixed(2) : 'N/A'}
                                    </p>
                                    <CardDescription className="text-orange-700 mt-2">
                                        Available for your campaigns.
                                    </CardDescription>
                                </Card>

                                <Card className="lg:col-span-2 p-6 flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <CardTitle className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</CardTitle>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Button
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-base"
                                            onClick={() => setShowAddFunds(true)}
                                        >
                                            <DollarSign className="w-5 h-5 mr-2" /> Add Funds
                                        </Button>
                                        <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 font-semibold py-3 text-base">
                                            <ArrowUpRightSquare className="w-5 h-5 mr-2" /> Withdraw Funds
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* --- Enhanced Funding Plans Section --- */}
                            <div className="my-12">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Funding Plans with 30% Bonus</h2>
                                <p className="text-center text-gray-500 mb-6">Choose a plan to get more value on your deposit.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Platinum Plan */}
                                    <div className="relative border  rounded-lg p-6 text-center hover:shadow-xl border-orange-400 transition-all duration-300 cursor-pointer">
                                         <div className="absolute top-0 right-0 m-4 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">Best Value</div>
                                        <Gem className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800">Platinum Plan</h3>
                                        <p className="text-3xl font-bold text-orange-600 my-2">$100</p>
                                        <p className="text-gray-500">Deposit this amount to activate the bonus.</p>
                                    </div>
                                    {/* Silver Plan */}
                                    <div className="border  rounded-lg p-6 text-center shadow-xl border-gray-500 transition-all duration-300 cursor-pointer">
                                        <Shield className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800">Silver Plan</h3>
                                        <p className="text-3xl font-bold text-gray-600 my-2">$250</p>
                                        <p className="text-gray-500">A popular choice for consistent growth.</p>
                                    </div>
                                    {/* Gold Plan */}
                                    <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-xl border-amber-500 transition-all duration-300 cursor-pointer">
                                        <Star className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800">Gold Plan</h3>
                                        <p className="text-3xl font-bold text-amber-600 my-2">$500</p>
                                        <p className="text-gray-500">Maximize your investment with our top-tier plan.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Transaction History Section */}
                            <div className="mt-10">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <History className="w-6 h-6 mr-3 text-gray-500" /> Transaction History
                                </h2>
                                <div className="rounded-lg border border-gray-200 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-gray-100">
                                             <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="bg-white divide-y divide-gray-200">
                                            {transactions.map((transaction) => (
                                                <TableRow key={transaction.id} className="hover:bg-gray-50">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                                                        {format(new Date(transaction.date), 'PP')}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap capitalize text-gray-600">{transaction.type}</TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            "px-6 py-4 whitespace-nowrap font-semibold",
                                                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                        )}
                                                    >
                                                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap">
                                                        <span className={cn(
                                                            "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
                                                            transaction.status === 'completed' && 'bg-green-100 text-green-800',
                                                            transaction.status === 'pending' && 'bg-yellow-100 text-yellow-800',
                                                            transaction.status === 'failed' && 'bg-red-100 text-red-800'
                                                        )}>
                                                            {transaction.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                                                        {transaction.description}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center p-5 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600">
                        For any billing inquiries, please contact support.
                    </p>
                </CardFooter>
            </Card>

            <style jsx>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
            `}</style>
            
            <AddFundsDialog open={showAddFunds} onOpenChange={setShowAddFunds} />
        </div>
    );
}
