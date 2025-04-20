import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Ride Offer Submitted!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Your ride has been successfully posted. Students looking for rides will now be able to see your offer and
            request to join.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/my-rides" className="w-full">
            <Button className="w-full">View My Rides</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
