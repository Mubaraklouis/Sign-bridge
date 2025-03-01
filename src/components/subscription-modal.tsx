"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Plus, Smartphone } from "lucide-react";

export default function SubscriptionModal({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert("Subscription successful!");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-primary_main p-6 flex flex-col items-center justify-center rounded-lg hover:bg-primary_main cursor-pointer text-center">
          <Plus className="text-white size-24" />
          <p className="text-white text-center">{label}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Subscribe to Premium</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to complete your subscription.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="momo" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="momo" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile Money
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Card Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="momo">
            <Card>
              <CardHeader>
                <CardTitle>Mobile Money Payment</CardTitle>
                <CardDescription>
                  Enter your mobile money details to subscribe.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="momo-provider">Provider</Label>
                    <Select required>
                      <SelectTrigger id="momo-provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="momo-number">Mobile Money Number</Label>
                    <Input
                      id="momo-number"
                      placeholder="Enter your mobile number"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="momo-name">Account Name</Label>
                    <Input
                      id="momo-name"
                      placeholder="Enter account name"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="card">
            <Card>
              <CardHeader>
                <CardTitle>Card Payment</CardTitle>
                <CardDescription>
                  Enter your card details to subscribe.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="Enter cardholder name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      required
                      type="text"
                      pattern="[0-9\s]{13,19}"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        type="text"
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        type="text"
                        pattern="[0-9]{3,4}"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
