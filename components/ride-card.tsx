import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Car, DollarSign, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface RideProps {
  ride: {
    id: string
    driver: {
      name: string
      avatar?: string
    }
    car: {
      make: string
      model: string
    }
    departure: string
    destination: string
    date: string
    time: string
    price?: number
    seatsAvailable: number
  }
}

export default function RideCard({ ride }: RideProps) {
  const formattedDate = format(new Date(ride.date), "EEE, MMM d, yyyy")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
              <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <p className="font-medium">{ride.driver.name}</p>
              <p className="text-sm text-muted-foreground">Driver</p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex items-start gap-2 mb-2 sm:mb-0">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{ride.departure}</p>
                  <p className="text-sm text-muted-foreground">Departure</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{ride.destination}</p>
                  <p className="text-sm text-muted-foreground">Destination</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{ride.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span>
                  {ride.car.make} {ride.car.model}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{ride.seatsAvailable} seats available</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center">
          {ride.price ? (
            <Badge variant="outline" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {ride.price.toFixed(2)}
            </Badge>
          ) : (
            <Badge variant="outline">Free</Badge>
          )}
        </div>

        <div className="flex gap-3">
          <Link href={`/ride/${ride.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          <Button>Request Ride</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
