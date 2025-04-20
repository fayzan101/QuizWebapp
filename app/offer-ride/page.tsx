"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OfferRidePage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hasPrice, setHasPrice] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the ride offer to a database
    // For now, we'll just redirect to a success page
    router.push("/offer-ride/success")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Offer a Ride</h1>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Ride Details</CardTitle>
            <CardDescription>Provide details about your ride to help students find your carpool.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Car Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="car-make">Car Make</Label>
                  <Input id="car-make" placeholder="e.g., Toyota" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="car-model">Car Model</Label>
                  <Input id="car-model" placeholder="e.g., Corolla" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seats-available">Seats Available</Label>
                <Select required>
                  <SelectTrigger id="seats-available">
                    <SelectValue placeholder="Select number of seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Route Information</h3>
              <div className="space-y-2">
                <Label htmlFor="departure">Departure Location</Label>
                <Input id="departure" placeholder="e.g., North Campus Parking Lot" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="e.g., Downtown University Housing" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="route-notes">Route Notes (Optional)</Label>
                <Textarea
                  id="route-notes"
                  placeholder="Any additional details about your route or stops along the way"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Date and Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departure-time">Departure Time</Label>
                  <div className="relative">
                    <Input id="departure-time" type="time" required />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Price Information</h3>
              <div className="flex items-center space-x-2">
                <Switch id="price-switch" checked={hasPrice} onCheckedChange={setHasPrice} />
                <Label htmlFor="price-switch">Charge for this ride</Label>
              </div>

              {hasPrice && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Seat</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Submit Ride Offer</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
