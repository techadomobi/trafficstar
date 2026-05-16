"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, MapPin, Building, User, FileText, Download } from "lucide-react";
import { format } from "date-fns";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";


// Hardcoded countries list (for UI purposes, would usually be fetched)
const countriesList = [
    { code: 'in', name: 'India' },
    { code: 'us', name: 'United States' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    // Add more as needed
];

// Placeholder for states list (would be dynamically loaded based on country)
const indiaStatesList = [
    { code: 'mh', name: 'Maharashtra' },
    { code: 'dl', name: 'Delhi' },
    { code: 'ka', name: 'Karnataka' },
    { code: 'tn', name: 'Tamil Nadu' },
    { code: 'up', name: 'Uttar Pradesh' },
    // Add more Indian states
];

// Hardcoded invoice data for UI design purposes
const invoicesData = [
    {
        id: 'INV-2023-001',
        date: '2023-10-20T10:00:00Z',
        amount: 500.00,
        status: 'Paid',
        downloadUrl: '/invoices/INV-2023-001.pdf', // Placeholder URL
    },
    {
        id: 'INV-2023-002',
        date: '2023-09-15T11:30:00Z',
        amount: 750.50,
        status: 'Paid',
        downloadUrl: '/invoices/INV-2023-002.pdf',
    },
    {
        id: 'INV-2023-003',
        date: '2023-08-10T09:00:00Z',
        amount: 1200.00,
        status: 'Paid',
        downloadUrl: '/invoices/INV-2023-003.pdf',
    },
    {
        id: 'INV-2023-004',
        date: '2023-07-05T14:00:00Z',
        amount: 300.00,
        status: 'Due', // Example of a pending invoice
        downloadUrl: '/invoices/INV-2023-004.pdf',
    },
];

export default function BillingPage() {
    const defaultValues = {
        name: "", // Now empty
        country: "", // Now empty (will show placeholder "Select Country")
        gstNo: "",
        panNo: "",
        billingCountry: "", // Now empty
        billingState: "", // Now empty
        doorNo: "",
        locality: "",
        pinCode: "",
    };

    const form = useForm({
        defaultValues: defaultValues,
        mode: "onSubmit",
    });

    const { handleSubmit, control } = form;

    const onSubmit = (data) => {
        console.log("Billing Data (UI-only, no update performed):", data);
        alert("Billing details form submitted (for demo purposes only). No data actually saved.");
    };

    const handleDownloadInvoice = (invoiceId, downloadUrl) => {
        console.log(`Simulating download for Invoice ID: ${invoiceId}. URL: ${downloadUrl}`);
        alert(`Downloading Invoice ${invoiceId}`);
    };

    return (
        <div className="min-h-screen py-4 px-2 sm:px-6 lg:px-8">
            <Card className="w-full max-w-8xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
                <CardHeader className="space-y-1 p-6 bg-orange-200 text-white">
                    <CardTitle className="text-3xl text-orange-900 font-bold flex items-center">
                        <CreditCard className="w-8 h-8 mr-3" /> Billing & Invoices
                    </CardTitle>
                    <CardDescription className="text-orange-900">
                        View your billing profile and past invoices.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 lg:p-10">
                    {/* Billing Details Section (Form) */}
                    {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <User className="w-6 h-6 mr-2 text-orange-600" /> Your Billing Profile
                    </h2> */}
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Basic Billing Details */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-orange-600" /> Basic Billing Details
                                </h3>
                                <FormField
                                    control={control}
                                    name="name"
                                    rules={{ required: "Name is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Name*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the name as per Bank details"
                                                    className="rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="country"
                                    rules={{ required: "Country is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Country*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="rounded-md">
                                                        <SelectValue placeholder="Select Country" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {countriesList.map(country => (
                                                        <SelectItem key={country.code} value={country.code}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Company Details */}
                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <Building className="w-5 h-5 mr-2 text-orange-600" /> Company Details
                                </h3>
                                <FormField
                                    control={control}
                                    name="gstNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">GST No</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your GST no"
                                                    className="rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="panNo"
                                    rules={{ required: "Pan No is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Pan No*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your pan no"
                                                    className="rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Billing Address */}
                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-orange-600" /> Billing Address
                                </h3>
                                <FormField
                                    control={control}
                                    name="billingCountry"
                                    rules={{ required: "Billing Country is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Country*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="rounded-md">
                                                        <SelectValue placeholder="Select Country" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {countriesList.map(country => (
                                                        <SelectItem key={country.code} value={country.code}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="billingState"
                                    rules={{ required: "State is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">State*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={form.watch('billingCountry') !== 'in'}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="rounded-md">
                                                        <SelectValue placeholder="Search for a state" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {form.watch('billingCountry') === 'in' ? (
                                                        indiaStatesList.map(state => (
                                                            <SelectItem key={state.code} value={state.code}>
                                                                {state.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="n/a" disabled>
                                                            Select India to choose state
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="doorNo"
                                    rules={{ required: "Door No./ Building/ Street Area is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Door No./ Building/ Street Area*</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter Door No./ Building/ Street Area"
                                                    className="rounded-md min-h-[60px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="locality"
                                    rules={{ required: "Locality/ Town is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Locality/ Town*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Locality/ Town"
                                                    className="rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="pinCode"
                                    rules={{
                                        required: "Pin Code/Postal Code is required",
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "Invalid Pin Code (e.g., 123456)",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Pin Code/Postal Code*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Pin Code/Postal Code"
                                                    className="rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
                            >
                                Submit for Demo 
                            </Button>
                        </form>
                    </Form>

                    <div className="my-10 border-t border-gray-200"></div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-orange-600" /> Your Invoices
                    </h2>
                    {invoicesData.length > 0 ? (
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoicesData.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">{invoice.id}</TableCell>
                                            <TableCell>{format(new Date(invoice.date), 'PPP')}</TableCell>
                                            <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-semibold",
                                                    invoice.status === 'Paid' && 'bg-green-100 text-green-800',
                                                    invoice.status === 'Due' && 'bg-yellow-100 text-yellow-800',
                                                    invoice.status === 'Overdue' && 'bg-red-100 text-red-800'
                                                )}>
                                                    {invoice.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDownloadInvoice(invoice.id, invoice.downloadUrl)}
                                                    className="flex items-center"
                                                >
                                                    <Download className="w-4 h-4 mr-2" /> Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">No invoices available.</p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center p-6 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600">
                        For any billing or invoice questions, please contact our support team.
                    </p>
                </CardFooter>
            </Card>
            <style jsx>{`
                @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }
                .animate-fade-in-down {
                animation: fadeInDown 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
