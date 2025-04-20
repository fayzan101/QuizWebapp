"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockRides } from "@/lib/mock-data"
import RideCard from "@/components/ride-card"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function MyRidesPage() {
  const [activeTab, setActiveTab] = useState("offered")

  // In a real app, we would fetch the user's offered and requested rides
  // For now, we'll use the mock data
  const offeredRides = mockRides.slice(0, 2) // First two rides as examples
  const requestedRides = mockRides.slice(2, 3) // Third ride as example

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Rides</h1>
        <Link href="/offer-ride">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Offer a New Ride
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="offered" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="offered">Rides I'm Offering</TabsTrigger>
          <TabsTrigger value="requested">Rides I've Requested</TabsTrigger>
        </TabsList>

        <TabsContent value="offered" className="space-y-6">
          {offeredRides.length > 0 ? (
            offeredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No rides offered</h3>
              <p className="text-muted-foreground mb-6">You haven't offered any rides yet.</p>
              <Link href="/offer-ride">
                <Button>Offer a Ride</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="requested" className="space-y-6">
          {requestedRides.length > 0 ? (
            requestedRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No rides requested</h3>
              <p className="text-muted-foreground mb-6">You haven't requested any rides yet.</p>
              <Link href="/find-ride">
                <Button>Find a Ride</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
