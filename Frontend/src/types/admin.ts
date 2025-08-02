export interface User {
    id: string
    name: string
    email: string
    phone: string
    role: "admin" | "sub-admin" | "user"
    createdAt: string
    lastLogin?: string
    status: "active" | "inactive"
  }
  
  export interface Booking {
    id: string
    userId: string
    userName: string
    testId: string
    testName: string
    price: number
    priceDisplay: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
    bookingDate: string
    testDate: string
    location: string
    createdAt: string
  }
  
  export interface AdminStats {
    totalUsers: number
    totalSubAdmins: number
    totalBookings: number
    totalTests: number
    recentBookings: number
    pendingBookings: number
  }
  