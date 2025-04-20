"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { CalendarIcon, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import RideCard from "@/components/ride-card"
import { mockRides } from "@/lib/mock-data"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"

export default function FindRidePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [priceRange, setPriceRange] = useState([0, 50])
  const [filteredRides, setFilteredRides] = useState(mockRides)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter rides based on search query and other filters
    const filtered = mockRides.filter((ride) => {
      const matchesSearch =
        ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.departure.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDate = !date || new Date(ride.date).toDateString() === date.toDateString()

      const matchesPrice =
        (!ride.price && priceRange[0] === 0) ||
        (ride.price && ride.price >= priceRange[0] && ride.price <= priceRange[1])

      return matchesSearch && matchesDate && matchesPrice
    })

    setFilteredRides(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Find a Ride</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by destination or departure"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Any date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Rides</SheetTitle>
                <SheetDescription>Adjust filters to find the perfect ride</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="pt-4">
                    <Slider defaultValue={[0, 50]} max={50} step={1} value={priceRange} onValueChange={setPriceRange} />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Any date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <SheetFooter>
                <Button
                  onClick={() => {
                    setDate(undefined)
                    setPriceRange([0, 50])
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No rides found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or check back later.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setDate(undefined)
                setPriceRange([0, 50])
                setFilteredRides(mockRides)
              }}
            >
              Reset Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
