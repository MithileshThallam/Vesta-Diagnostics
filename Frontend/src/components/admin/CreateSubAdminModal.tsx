"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateSubAdminModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

interface SubAdminFormData {
  phone: string
  role: string
  branch: string
  password: string
}

const branches = [
  "Mumbai Central",
  "Delhi NCR",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export const CreateSubAdminModal = ({ open, onClose, onSuccess }: CreateSubAdminModalProps) => {
  const [formData, setFormData] = useState<SubAdminFormData>({
    phone: "",
    role: "sub-admin",
    branch: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Sub-admin data: ", formData);
      const response = await fetch("http://localhost:5000/api/admin/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message || "Failed to create sub-admin")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: "Sub-admin account created successfully",
      })

      console.log("Sub-admin created:", result)

      setFormData({
        phone: "",
        role: "sub-admin",
        branch: "",
        password: "",
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error creating sub-admin:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create sub-admin",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof SubAdminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[hsl(0_0%_20%)] flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[hsl(15_96%_53%)]" />
            Create Sub-Admin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[hsl(0_0%_20%)]">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
              required
              className="bg-[hsl(0_0%_98%)] border-[hsl(0_0%_90%)] focus:border-[hsl(15_96%_53%)] focus:ring-[hsl(15_96%_53%/0.2)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-[hsl(0_0%_20%)]">
              Branch Location
            </Label>
            <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
              <SelectTrigger className="bg-[hsl(0_0%_98%)] border-[hsl(0_0%_90%)] focus:border-[hsl(15_96%_53%)] focus:ring-[hsl(15_96%_53%/0.2)]">
                <SelectValue placeholder="Select branch location" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[hsl(0_0%_20%)]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
              required
              minLength={6}
              className="bg-[hsl(0_0%_98%)] border-[hsl(0_0%_90%)] focus:border-[hsl(15_96%_53%)] focus:ring-[hsl(15_96%_53%/0.2)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-[hsl(0_0%_20%)]">
              Role
            </Label>
            <Input
              id="role"
              value={formData.role}
              disabled
              className="bg-[hsl(0_0%_95%)] border-[hsl(0_0%_90%)] text-[hsl(0_0%_45%)]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[hsl(0_0%_90%)] hover:bg-[hsl(0_0%_96%)] bg-transparent"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] hover:from-[hsl(15_96%_48%)] hover:to-[hsl(248_81%_15%)] border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Sub-Admin
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
