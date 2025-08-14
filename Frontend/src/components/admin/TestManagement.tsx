"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, Filter, Plus, Edit, Trash2, Clock, Activity, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTestModal from "./CreateTestModal"
import TestModal from "./TestModal"
import { adminApiCall } from "@/utils/apiUtils"
import { useToast } from "@/hooks/use-toast"
import type { MedicalTest } from "@/types/test"

// Extract category color mapping to a constant
const CATEGORY_COLORS: Record<string, string> = {
  dermatology: "bg-[hsl(330_50%_60%)]",
  microbiology: "bg-[hsl(10_80%_55%)]",
  immunology: "bg-[hsl(210_80%_55%)]",
  endocrinology: "bg-[hsl(280_60%_65%)]",
  cardiology: "bg-[hsl(0_75%_60%)]",
  haematology: "bg-[hsl(180_70%_45%)]",
  serology: "bg-[hsl(45_90%_60%)]",
  default: "bg-[hsl(0_0%_65%)]"
}

// Helper function to create test data payload
const createTestPayload = (test: Omit<MedicalTest, "id"> | MedicalTest) => ({
  name: test.name,
  category: test.category,
  description: test.description,
  duration: test.duration,
  locations: test.locations,
  popular: test.popular,
  keywords: test.keywords,
  parts: test.parts,
  parameterCount: test.parameterCount,
  parameters: test.parameters,
  reportIn: test.reportIn,
  about: test.about
})

export const TestManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingTest, setEditingTest] = useState<MedicalTest | null>(null)
  const [tests, setTests] = useState<MedicalTest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingTestId, setDeletingTestId] = useState<string | null>(null)
  const { toast } = useToast()

  // Memoized fetch function
  const fetchTests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await adminApiCall("/api/tests/all")
      if (res.data?.tests) {
        setTests(res.data.tests)
      } else {
        setError(res.error || "Failed to fetch tests")
      }
    } catch (err) {
      setError("Failed to fetch tests")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTests()
  }, [fetchTests])

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Memoized filtered tests
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || test.category === filterCategory
      return matchesSearch && matchesCategory
    })
  }, [tests, debouncedSearchTerm, filterCategory])

  // Stable handler references
  const createTestHandler = useCallback(async (newTest: Omit<MedicalTest, "id">) => {
    try {
      const testData = createTestPayload(newTest)
      
      // Optimistic update
      const tempId = `temp-${Date.now()}`
      const optimisticTest = { ...newTest, id: tempId } as MedicalTest
      setTests(prev => [optimisticTest, ...prev])

      const response = await fetch("http://localhost:5000/api/tests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(testData),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const res = await response.json()
      if (res.data?.test) {
        // Replace optimistic update with real data
        setTests(prev => [
          res.data.test,
          ...prev.filter(t => t.id !== tempId)
        ])
        toast({
          title: "Test Created Successfully",
          description: `"${res.data.test.name}" has been added.`,
        })
      } else {
        throw new Error(res.error || "Failed to create test")
      }
    } catch (error) {
      // Rollback optimistic update
      setTests(prev => prev.filter(t => !t.id.startsWith('temp-')))
      toast({
        title: "Error Creating Test",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }, [toast])

  const openEditModal = useCallback((test: MedicalTest) => {
    setEditingTest({
      ...test,
      locations: test.locations || [],
      parameters: test.parameters || [],
      parts: test.parts || [],
      keywords: test.keywords || [],
    })
    setShowEditForm(true)
  }, [])

  const editTestHandler = useCallback(async (updatedTest: MedicalTest | Omit<MedicalTest, "id">) => {
    // Ensure we have an id for editing
    if (!('id' in updatedTest)) {
      toast({
        title: "Error",
        description: "Test ID is required for editing",
        variant: "destructive",
      })
      return
    }
    try {
      const testData = createTestPayload(updatedTest)
      
      // Optimistic update
      setTests(prev => prev.map(t => 
        t.id === updatedTest.id ? { ...t, ...updatedTest } : t
      ))

      const res = await fetch(`http://localhost:5000/api/tests/${updatedTest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(testData),
      })

      if (!res.ok) {
        throw new Error((await res.json()).error || "Failed to update test")
      }

      setShowEditForm(false)
      setEditingTest(null)
    } catch (error) {
      // On error, refetch to ensure consistency
      fetchTests()
      toast({
        title: "Error Updating Test",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }, [fetchTests, toast])

  const confirmAndDelete = useCallback(async (testId: string) => {
    const test = tests.find(t => t.id === testId)
    if (!test) return

    const confirmed = window.confirm(`Delete "${test.name}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      setDeletingTestId(testId)
      
      // Optimistic update
      setTests(prev => prev.filter(t => t.id !== testId))

      const res = await adminApiCall(`/api/tests/${testId}`, {
        method: "DELETE",
      })

      if (!res.data?.success) {
        throw new Error(res.error || "Failed to delete test")
      }

      toast({
        title: "Test Deleted Successfully",
        description: `"${test.name}" has been removed.`,
      })
    } catch (error) {
      // On error, refetch to ensure consistency
      fetchTests()
      toast({
        title: "Error Deleting Test",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setDeletingTestId(null)
    }
  }, [tests, fetchTests, toast])

  const formatReportTime = useCallback((hours: number) => {
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} days`
    return `${Math.floor(hours / 168)} weeks`
  }, [])

  const getCategoryColor = useCallback((category: string) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.default
  }, [])

  // Skeleton loader component
  const TestCardSkeleton = () => (
    <Card className="border-2 border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] animate-pulse">
      <CardHeader>
        <div className="h-6 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded w-full mb-2"></div>
        <div className="h-4 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded w-5/6"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded w-full mb-4"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded flex-1"></div>
          <div className="h-8 bg-[hsl(0_0%_90%)] dark:bg-[hsl(215_15%_20%)] rounded w-8"></div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            Test Management
          </h2>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1">Manage diagnostic tests and parameters</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <TestCardSkeleton key={i} />)}
        </div>
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
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-xl font-bold text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] group-hover:text-[hsl(15_96%_53%)] transition-colors duration-300 leading-tight">
                    {test.name}
                  </CardTitle>

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

                <div className="flex gap-2 mt-3">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(test.category)}`}
                  >
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
                <div className="space-y-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                      <Clock className="w-4 h-4 mr-2 text-[hsl(200_100%_50%)]" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-start text-sm text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                      <MapPin className="w-4 h-4 mr-2 text-[hsl(15_96%_53%)] mt-0.5 flex-shrink-0" />
                      <span>{test.locations?.join(", ") || "No locations available"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => openEditModal(test)}
                    disabled={deletingTestId === test.id}
                    className="flex-1 text-[hsl(0_0%_45%)] hover:text-[hsl(0_0%_20%)] dark:hover:text-[hsl(0_0%_95%)] hover:bg-[hsl(0_0%_90%)] dark:hover:bg-[hsl(215_15%_25%)] border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] group-hover:bg-[hsl(15_96%_53%)] group-hover:text-white group-hover:border-[hsl(15_96%_53%)]"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => confirmAndDelete(test.id)}
                    disabled={deletingTestId === test.id}
                    className="text-[hsl(0_84%_60%)] hover:text-[hsl(0_84%_55%)] hover:bg-[hsl(0_84%_60%/0.1)] border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]"
                  >
                    {deletingTestId === test.id ? (
                      <div className="w-4 h-4 border-2 border-[hsl(0_84%_60%)] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateTestModal
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={createTestHandler}
      />

      <TestModal
        open={showEditForm}
        onClose={() => {
          setShowEditForm(false)
          setEditingTest(null)
        }}
        onSubmit={editTestHandler}
        editTest={editingTest}
        mode="edit"
      />
    </div>
  )
}
