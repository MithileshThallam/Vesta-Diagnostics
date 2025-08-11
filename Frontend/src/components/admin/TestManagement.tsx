"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Plus, Edit, Trash2, Clock, Activity, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTestModal from "./CreateTestModal"
import { adminApiCall } from "@/utils/apiUtils"
import { useToast } from "@/hooks/use-toast"
import type { MedicalTest } from "@/types/test"

export const TestManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [tests, setTests] = useState<MedicalTest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true)
      setError(null)
      const res = await adminApiCall("/api/tests/all")
      if (res.data && res.data.tests) {
        setTests(res.data.tests)
      } else {
        setError(res.error || "Failed to fetch tests")
      }
      setLoading(false)
    }
    fetchTests()
  }, [])

  const createTestHandler = async (newTest: Omit<MedicalTest, "id">) => {
    try {
      // Format the test data according to backend requirements
      const testData = {
        name: newTest.name,
        category: newTest.category,
        description: newTest.description,
        duration: newTest.duration,
        locationNames: newTest.locations, // Backend expects locationNames for validation
        locations: newTest.locations, // Keep locations for model compatibility
        popular: newTest.popular,
        keywords: newTest.keywords,
        parts: newTest.parts,
        parameterCount: newTest.parameterCount,
        parameters: newTest.parameters,
        reportIn: newTest.reportIn,
        about: newTest.about,
      }

      console.log("Sending test data to backend:", testData)

      const res = await adminApiCall("/api/tests/create", {
        method: 'POST',
        body: JSON.stringify(testData)
      })

      console.log("Backend response:", res)

      if (res.data && res.data.test) {
        // Add the newly created test to the top of the list
        const createdTest = res.data.test
        setTests(prevTests => [createdTest, ...prevTests])
        
        // Show success toast
        toast({
          title: "Test Created Successfully",
          description: `"${createdTest.name}" has been added to the test database.`,
        })
        
        // Close the modal
        setShowCreateForm(false)
      } else {
        throw new Error(res.error || "Failed to create test")
      }
    } catch (error) {
      console.error("Error creating test:", error)
      
      // Show error toast
      toast({
        title: "Error Creating Test",
        description: error instanceof Error ? error.message : "An unexpected error occurred while creating the test.",
        variant: "destructive",
      })
    }
  }

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || test.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "dermatology":
        return "bg-[hsl(330_50%_60%)]" // Softer purple-pink for skin
      case "microbiology":
        return "bg-[hsl(10_80%_55%)]" // Vibrant red-orange for microbes
      case "immunology":
        return "bg-[hsl(210_80%_55%)]" // Cool blue for immune system
      case "endocrinology":
        return "bg-[hsl(280_60%_65%)]" // Soft purple for hormones
      case "cardiology":
        return "bg-[hsl(0_75%_60%)]" // Strong red for heart
      case "haematology":
        return "bg-[hsl(180_70%_45%)]" // Teal for blood studies
      case "serology":
        return "bg-[hsl(45_90%_60%)]" // Warm gold for serum
      default:
        return "bg-[hsl(0_0%_65%)]" // Lighter neutral gray
    }
  }

  const formatReportTime = (hours: number) => {
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} days`
    return `${Math.floor(hours / 168)} weeks`
  }

  const getLocationNames = (parts: string[]) => {
    if (parts.length >= 8) return "All Locations"
    return parts.join(", ")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            Test Management
          </h2>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1">
            Manage diagnostic tests and parameters
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] hover:from-[hsl(15_96%_48%)] hover:to-[hsl(248_81%_15%)] border-0 shadow-lg hover:shadow-hover transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Test
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0_0%_45%)] h-4 w-4" />
              <input
                type="text"
                placeholder="Search tests by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[hsl(0_0%_98%)] dark:bg-[hsl(215_15%_20%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] rounded-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] placeholder-[hsl(0_0%_45%)] focus:outline-none focus:ring-2 focus:ring-[hsl(15_96%_53%/0.5)] focus:border-[hsl(15_96%_53%/0.5)] transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none bg-[hsl(0_0%_98%)] dark:bg-[hsl(215_15%_20%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] rounded-lg px-4 py-3 pr-10 text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] focus:outline-none focus:ring-2 focus:ring-[hsl(15_96%_53%/0.5)] focus:border-[hsl(15_96%_53%/0.5)] transition-all duration-300"
              >
                <option value="all">All Categories</option>
                <option value="neurological">Neurological</option>
                <option value="cardiology">Cardiology</option>
                <option value="laboratory">Laboratory</option>
                <option value="radiology">Radiology</option>
                <option value="genetic">Genetic</option>
                <option value="preventive">Preventive</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(0_0%_45%)] h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tests Grid */}
      {loading ? (
        <div className="text-center py-12 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">Loading tests...</div>
      ) : error ? (
        <div className="text-center py-12 text-[hsl(0_84%_60%)]">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className="group hover:shadow-xl border-2 border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <CardHeader className="pb-4">
                {/* Package Title and Highlights */}
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-xl font-bold text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] group-hover:text-[hsl(15_96%_53%)] transition-colors duration-300 leading-tight">
                    {test.name}
                  </CardTitle>

                  {/* Highlights section */}
                  <div className="flex flex-col gap-1 text-sm text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-[hsl(15_96%_53%)]" />
                      <span>Reports in {formatReportTime(test.reportIn)}</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-[hsl(15_96%_53%)]" />
                      <span>{test.parameterCount} Parameters</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-3">
                  <span className={`text-white text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(test.category)}`}>
                    {test.category}
                  </span>
                  {test.popular && (
                    <span className="bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] text-white text-xs px-3 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Test Details */}
                <div className="space-y-4 mb-4">
                 

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                      <Clock className="w-4 h-4 mr-2 text-[hsl(200_100%_50%)]" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-start text-sm text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                      <MapPin className="w-4 h-4 mr-2 text-[hsl(15_96%_53%)] mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{getLocationNames(test.parts)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-[hsl(0_0%_45%)] hover:text-[hsl(0_0%_20%)] dark:hover:text-[hsl(0_0%_95%)] hover:bg-[hsl(0_0%_90%)] dark:hover:bg-[hsl(215_15%_25%)] border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] group-hover:bg-[hsl(15_96%_53%)] group-hover:text-white group-hover:border-[hsl(15_96%_53%)]"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-[hsl(0_84%_60%)] hover:text-[hsl(0_84%_55%)] hover:bg-[hsl(0_84%_60%/0.1)] border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <CreateTestModal
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={(newTest) => {createTestHandler(newTest)}}
      />
    </div>
  )
}
