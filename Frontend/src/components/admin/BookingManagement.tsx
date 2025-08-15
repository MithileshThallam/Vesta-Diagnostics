import { useEffect, useState } from "react"
import { Search, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking } from "@/types/admin"

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // useEffect(() => {
  //   let isMounted = true
  //   setLoading(true)
  //   setError(null)

  //   const fetchBookings = async () => {
      //     let res = await fetch("https://vesta-diagnostics-t4nn.vercel.app/api/bookings/get-bookings", {
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     let response = await res.json()
  //     setBookings(response.bookings)
  //     setLoading(false)
  //     console.log(response.bookings)
  //   }
  //   fetchBookings()
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])
  useEffect(() => {
  let isMounted = true
  setLoading(true)
  setError(null)

  const fetchBookings = async () => {
    try {
      let res = await fetch("https://vesta-diagnostics-t4nn.vercel.app/api/bookings/get-bookings", {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let response = await res.json()

      if (isMounted) {
        setBookings(response.bookings)
        setLoading(false)
      }
    } catch (err) {
      if (isMounted) {
        setError("Failed to load bookings")
        setLoading(false)
      }
    }
  }

  fetchBookings()

  return () => {
    isMounted = false
  }
}, [])


  const filteredBookings = bookings.filter((booking: Booking) => {
    return (
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.test?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            Booking Management
          </h2>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1">
            Monitor test bookings
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0_0%_45%)] h-4 w-4" />
            <input
              type="text"
              placeholder="Search by user, test name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[hsl(0_0%_98%)] dark:bg-[hsl(215_15%_20%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] rounded-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] placeholder-[hsl(0_0%_45%)] focus:outline-none focus:ring-2 focus:ring-[hsl(15_96%_53%/0.5)] focus:border-[hsl(15_96%_53%/0.5)] transition-all duration-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[hsl(15_96%_53%)]" />
            Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-lg text-gray-500">Loading bookings...</div>
          ) : error ? (
            <div className="py-8 text-center text-lg text-red-500">{error}</div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-8 text-center text-lg text-gray-500">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
                    <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                      User
                    </th>
                    <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                      Test
                    </th>
                    <th className="text-left py-4 px-4 text-[hsl(0_0%_60%)] font-medium">
                      Schedule
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking: Booking) => (
                    <tr
                      key={booking.phone}
                      className="border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] hover:bg-[hsl(0_0%_96%)] dark:hover:bg-[hsl(215_15%_20%)] transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(248_81%_20%)] to-[hsl(15_96%_53%)] flex items-center justify-center text-white text-sm font-semibold">
                            {booking.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] font-medium">
                              {booking.name}
                            </div>
                            <div className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">
                              ID: {booking.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] font-medium">
                            {booking.test}
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">
                              <MapPin className="h-3 w-3" />
                              {booking.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{booking.date ? new Date(booking.date).toLocaleDateString() : "-"}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingManagement
