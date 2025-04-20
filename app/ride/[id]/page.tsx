"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Car, DollarSign, User, ArrowRight, MessageSquare, Star } from "lucide-react"
import { mockRides } from "@/lib/mock-data"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

export default function RideDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const rideId = params.id as string

  // Find the ride in our mock data
  const ride = mockRides.find((r) => r.id === rideId)

  // If ride not found, show error
  if (!ride) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Ride Not Found</h1>
        <p className="text-muted-foreground mb-8">The ride you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/find-ride")}>Back to Search</Button>
      </div>
    )
  }

  const formattedDate = format(new Date(ride.date), "EEEE, MMMM d, yyyy")

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        ← Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{ride.departure}</p>
                    <p className="text-sm text-muted-foreground">Departure</p>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{ride.destination}</p>
                    <p className="text-sm text-muted-foreground">Destination</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{ride.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">
                      {ride.car.make} {ride.car.model}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Seats Available</p>
                    <p className="font-medium">{ride.seatsAvailable} seats</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Price per Seat</p>
                  <p className="font-medium">{ride.price ? `$${ride.price.toFixed(2)}` : "Free"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Request to Join This Ride</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
                <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{ride.driver.name}</h3>
              <div className="flex items-center gap-1 mt-1 mb-4">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground ml-1">(24 rides)</span>
              </div>

              <Separator className="my-4" />

              <div className="w-full">
                <h4 className="font-medium mb-2">Driver Preferences</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">No smoking</Badge>
                  <Badge variant="secondary">Light conversation</Badge>
                  <Badge variant="secondary">Music OK</Badge>
                </div>
              </div>

              <Button variant="outline" className="mt-6 w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Driver
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
