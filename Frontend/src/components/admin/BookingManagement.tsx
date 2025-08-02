"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Clock, MapPin, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminStore } from "@/stores/adminStore"

const BookingManagement = () => {
  const { bookings, updateBooking, deleteBooking } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/10"
      case "confirmed":
        return "text-blue-400 bg-blue-400/10"
      case "completed":
        return "text-green-400 bg-green-400/10"
      case "cancelled":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-slate-400 bg-slate-400/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return AlertCircle
      case "confirmed":
        return CheckCircle
      case "completed":
        return CheckCircle
      case "cancelled":
        return XCircle
      default:
        return Clock
    }
  }

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    updateBooking(bookingId, { status: newStatus as any })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Booking Management
          </h2>
          <p className="text-slate-400 mt-1">Monitor and manage all test bookings</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by user, test name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="appearance-none bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cyan-400" />
            Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">Booking</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">User</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">Test</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">Schedule</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-right py-4 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const StatusIcon = getStatusIcon(booking.status)
                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-white font-medium">#{booking.id}</div>
                          <div className="text-slate-400 text-sm">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                            {booking.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-medium">{booking.userName}</div>
                            <div className="text-slate-400 text-sm">ID: {booking.userId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-white font-medium">{booking.testName}</div>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-vesta-orange font-semibold">{booking.priceDisplay}</span>
                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                              <MapPin className="h-3 w-3" />
                              {booking.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="h-3 w-3" />
                            <span className="text-sm">{new Date(booking.testDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span className="text-sm">{new Date(booking.testDate).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`appearance-none px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${getStatusColor(booking.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingManagement
