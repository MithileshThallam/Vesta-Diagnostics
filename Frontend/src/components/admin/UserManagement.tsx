"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, UserCheck, UserX, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminStore } from "@/stores/adminStore"

const UserManagement = () => {
  const { users, deleteUser, updateUser } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<"all" | "user" | "sub-admin">("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    updateUser(userId, { status: newStatus as "active" | "inactive" })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-[hsl(0_84%_60%)] to-[hsl(0_84%_50%)]"
      case "sub-admin":
        return "bg-gradient-to-r from-[hsl(248_81%_20%)] to-[hsl(248_81%_15%)]"
      default:
        return "bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(15_96%_43%)]"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-[hsl(120_60%_50%)]" : "text-[hsl(0_84%_60%)]"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            User Management
          </h2>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1">
            Manage system users and permissions
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] hover:from-[hsl(15_96%_48%)] hover:to-[hsl(248_81%_15%)] border-0 shadow-lg hover:shadow-hover transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0_0%_45%)] h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[hsl(0_0%_98%)] dark:bg-[hsl(215_15%_20%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] rounded-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] placeholder-[hsl(0_0%_45%)] focus:outline-none focus:ring-2 focus:ring-[hsl(15_96%_53%/0.5)] focus:border-[hsl(15_96%_53%/0.5)] transition-all duration-300"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as "all" | "user" | "sub-admin")}
                className="appearance-none bg-[hsl(0_0%_98%)] dark:bg-[hsl(215_15%_20%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] rounded-lg px-4 py-3 pr-10 text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] focus:outline-none focus:ring-2 focus:ring-[hsl(15_96%_53%/0.5)] focus:border-[hsl(15_96%_53%/0.5)] transition-all duration-300"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="sub-admin">Sub-Admins</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(0_0%_45%)] h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-[hsl(15_96%_53%)]" />
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
                  <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    User
                  </th>
                  <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    Contact
                  </th>
                  <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    Role
                  </th>
                  <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    Last Login
                  </th>
                  <th className="text-right py-4 px-4 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] hover:bg-[hsl(0_0%_96%)] dark:hover:bg-[hsl(215_15%_20%)] transition-colors duration-200"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] font-medium">
                            {user.name}
                          </div>
                          <div className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                          <Mail className="h-3 w-3" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleStatusToggle(user.id, user.status)}
                        className={`flex items-center gap-2 ${getStatusColor(user.status)} hover:opacity-80 transition-opacity`}
                      >
                        {user.status === "active" ? (
                          <UserCheck className="h-4 w-4" />
                        ) : (
                          <UserX className="h-4 w-4" />
                        )}
                        <span className="text-sm capitalize">{user.status}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[hsl(0_0%_45%)] hover:text-[hsl(0_0%_20%)] dark:hover:text-[hsl(0_0%_95%)] hover:bg-[hsl(0_0%_90%)] dark:hover:bg-[hsl(215_15%_25%)]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                          className="text-[hsl(0_84%_60%)] hover:text-[hsl(0_84%_55%)] hover:bg-[hsl(0_84%_60%/0.1)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement