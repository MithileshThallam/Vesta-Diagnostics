"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Plus, Minus, Clock, Activity, MapPin, Zap, FileText, AlertTriangle, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import type { MedicalTest } from "@/types/test"
import { debounce } from "lodash-es"

// Static category data for better performance
const TEST_CATEGORIES = [
  { value: "laboratory", label: "Laboratory", color: "hsl(120_60%_50%)" },
  { value: "neurological", label: "Neurological", color: "hsl(248_81%_20%)" },
  { value: "cardiology", label: "Cardiology", color: "hsl(0_84%_60%)" },
  { value: "radiology", label: "Radiology", color: "hsl(200_100%_50%)" },
  { value: "genetic", label: "Genetic", color: "hsl(45_100%_50%)" },
  { value: "preventive", label: "Preventive", color: "hsl(160_100%_40%)" },
] as const

interface TestModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (test: Omit<MedicalTest, "id"> | MedicalTest) => void
  editTest?: MedicalTest | null
  mode: "create" | "edit"
}

interface FormData {
  name: string
  description: string
  category: string
  duration: string
  reportIn: string
  parameterCount: string
  parameters: string[]
  parts: string[]
  popular: boolean
  locations: string[]
  keywords: string[]
  about: string
}

const TestModal = ({ open, onClose, onSubmit, editTest, mode }: TestModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "laboratory",
    duration: "",
    reportIn: "",
    parameterCount: "",
    parameters: [""],
    parts: [""],
    popular: false,
    locations: [""],
    keywords: [""],
    about: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Memoized validation function
  const validateForm = useCallback((): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Test name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.duration.trim()) newErrors.duration = "Duration is required"
    if (!formData.reportIn || isNaN(Number(formData.reportIn)) || Number(formData.reportIn) <= 0) {
      newErrors.reportIn = "Valid report time is required"
    }
    if (!formData.parameterCount || isNaN(Number(formData.parameterCount))) {
      newErrors.parameterCount = "Valid parameter count is required"
    }
    if (formData.parts.filter((part) => part.trim()).length === 0) {
      newErrors.parts = "At least one test part is required"
    }
    if (formData.parameters.filter((param) => param.trim()).length === 0) {
      newErrors.parameters = "At least one parameter is required"
    }
    if (!formData.about.trim()) newErrors.about = "About information is required"

    return newErrors
  }, [formData])

  // Initialize form data when opening
  useEffect(() => {
    if (open) {
      if (mode === "edit" && editTest) {
        setFormData({
          name: editTest.name || "",
          description: editTest.description || "",
          category: editTest.category || "laboratory",
          duration: editTest.duration || "",
          reportIn: editTest.reportIn?.toString() || "",
          parameterCount: editTest.parameterCount?.toString() || "",
          parameters: editTest.parameters?.length > 0 ? [...editTest.parameters] : [""],
          parts: editTest.parts?.length > 0 ? [...editTest.parts] : [""],
          popular: editTest.popular || false,
          locations: editTest.locations?.length > 0 ? [...editTest.locations] : [""],
          keywords: editTest.keywords?.length > 0 ? [...editTest.keywords] : [""],
          about: editTest.about || "",
        })
      } else {
        setFormData({
          name: "",
          description: "",
          category: "laboratory",
          duration: "",
          reportIn: "",
          parameterCount: "",
          parameters: [""],
          parts: [""],
          popular: false,
          locations: [""],
          keywords: [""],
          about: "",
        })
      }
      setErrors({})
      setIsSubmitting(false)
    }
  }, [open, mode, editTest])

  // Memoized report time display
  const reportTimeDisplay = useMemo(() => {
    const hours = Number(formData.reportIn)
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} days`
    return `${Math.floor(hours / 168)} weeks`
  }, [formData.reportIn])

  // Debounced input handlers
  const debouncedHandleInputChange = useMemo(
    () =>
      debounce((field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: "" }))
        }
      }, 100),
    [errors]
  )

  // Stable array handlers
  const handleArrayChange = useCallback(
    (field: "parts" | "locations" | "keywords" | "parameters", index: number, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }))
    },
    []
  )

  const addArrayItem = useCallback((field: "parts" | "locations" | "keywords" | "parameters") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }, [])

  const removeArrayItem = useCallback((field: "parts" | "locations" | "keywords" | "parameters", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }, [])

  // Optimistic form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const validationErrors = validateForm()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        // Focus first error field
        const firstError = Object.keys(validationErrors)[0]
        const input = formRef.current?.querySelector(`[name="${firstError}"]`) as HTMLElement
        input?.focus()
        return
      }

      setIsSubmitting(true)

      try {
        const testData: MedicalTest = {
          ...(mode === "edit" && editTest ? { id: editTest.id } : { id: `test-${Date.now()}` }),
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          duration: formData.duration.trim(),
          reportIn: Number(formData.reportIn),
          parameterCount: Number(formData.parameterCount),
          parameters: formData.parameters.filter((param) => param.trim()),
          parts: formData.parts.filter((part) => part.trim()),
          popular: formData.popular,
          locations: formData.locations.filter((location) => location.trim()),
          keywords: formData.keywords.filter((keyword) => keyword.trim()),
          about: formData.about.trim(),
        }

        // Optimistic UI update
        onSubmit(testData)
        
        // Simulate network delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        onClose()
      } catch (error) {
        console.error("Error submitting test:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, mode, editTest, onSubmit, onClose]
  )

  // Memoized selected category
  const selectedCategory = useMemo(
    () => TEST_CATEGORIES.find((cat) => cat.value === formData.category),
    [formData.category]
  )

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedHandleInputChange.cancel()
    }
  }, [debouncedHandleInputChange])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-background border shadow-soft">
        <DialogHeader className="border-b pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(248_81%_20%)] bg-clip-text text-transparent flex items-center">
            <Stethoscope className="w-8 h-8 mr-3 text-primary" />
            {mode === "edit" ? "Edit Medical Test" : "Create New Medical Test"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-8 overflow-auto max-h-[calc(90vh-10rem)]">
          {/* Left Panel - Form */}
          <div className="flex-1 overflow-y-auto pr-4 space-y-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 py-4">
              {/* Basic Information */}
              <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                <h3 className="font-bold text-xl text-foreground flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-primary" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Test Name *
                    </Label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => debouncedHandleInputChange("name", e.target.value)}
                      className="w-full px-4 py-3 bg-background border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="Enter test name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-sm font-semibold">
                      Category *
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={(e) => debouncedHandleInputChange("category", e.target.value)}
                      className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    >
                      {TEST_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => debouncedHandleInputChange("description", e.target.value)}
                    className="min-h-[100px] resize-none bg-background border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Enter test description"
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="about" className="text-sm font-semibold">
                    About This Test *
                  </Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={(e) => debouncedHandleInputChange("about", e.target.value)}
                    className="min-h-[120px] resize-none bg-background border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Enter detailed information about the test"
                  />
                  {errors.about && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.about}
                    </p>
                  )}
                </div>
              </div>

              {/* Test Details */}
              <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                <h3 className="font-bold text-xl text-foreground flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-[hsl(248_81%_20%)]" />
                  Test Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="duration" className="text-sm font-semibold flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-[hsl(200_100%_50%)]" />
                      Duration *
                    </Label>
                    <input
                      id="duration"
                      name="duration"
                      type="text"
                      value={formData.duration}
                      onChange={(e) => debouncedHandleInputChange("duration", e.target.value)}
                      className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="e.g., 2-3 hours"
                    />
                    {errors.duration && (
                      <p className="text-destructive text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.duration}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="reportIn" className="text-sm font-semibold flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-[hsl(45_100%_50%)]" />
                      Report Time (hours) *
                    </Label>
                    <input
                      id="reportIn"
                      name="reportIn"
                      type="number"
                      value={formData.reportIn}
                      onChange={(e) => debouncedHandleInputChange("reportIn", e.target.value)}
                      className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="24"
                      min="1"
                      step="1"
                    />
                    {errors.reportIn && (
                      <p className="text-destructive text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.reportIn}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="parameterCount" className="text-sm font-semibold">
                      Parameter Count *
                    </Label>
                    <input
                      id="parameterCount"
                      name="parameterCount"
                      type="number"
                      value={formData.parameterCount}
                      onChange={(e) => debouncedHandleInputChange("parameterCount", e.target.value)}
                      className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="1"
                      min="1"
                      step="1"
                    />
                    {errors.parameterCount && (
                      <p className="text-destructive text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.parameterCount}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                <h3 className="font-bold text-xl text-foreground flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-[hsl(248_81%_20%)]" />
                  Test Parameters
                </h3>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Parameters Tested *
                  </Label>
                  {formData.parameters.map((parameter, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={parameter}
                        onChange={(e) => handleArrayChange("parameters", index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                        placeholder={`Parameter ${index + 1}`}
                      />
                      {formData.parameters.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("parameters", index)}
                          className="px-4 text-destructive hover:text-white hover:bg-destructive border hover:border-destructive transition-all duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("parameters")}
                    className="text-[hsl(248_81%_20%)] hover:text-white hover:bg-[hsl(248_81%_20%)] border hover:border-[hsl(248_81%_20%)] transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Parameter
                  </Button>
                  {errors.parameters && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.parameters}
                    </p>
                  )}
                </div>
              </div>

              {/* Test Parts */}
              <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                <h3 className="font-bold text-xl text-foreground flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-primary" />
                  Test Components
                </h3>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Body Parts/Components *
                  </Label>
                  {formData.parts.map((part, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={part}
                        onChange={(e) => handleArrayChange("parts", index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                        placeholder={`Part ${index + 1}`}
                      />
                      {formData.parts.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("parts", index)}
                          className="px-4 text-destructive hover:text-white hover:bg-destructive border hover:border-destructive transition-all duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("parts")}
                    className="text-primary hover:text-white hover:bg-primary border hover:border-primary transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Part
                  </Button>
                  {errors.parts && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.parts}
                    </p>
                  )}
                </div>
              </div>

              {/* Locations & Keywords Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Locations */}
                <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                  <h3 className="font-bold text-lg text-foreground">Locations</h3>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Available Locations
                    </Label>
                    {(formData.locations.length > 0 ? formData.locations : ['']).map((location, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => handleArrayChange("locations", index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                          placeholder={`Location ${index + 1}`}
                        />
                        {(formData.locations.length > 1 || (formData.locations.length === 0 && index > 0)) && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("locations", index)}
                            className="px-4 text-destructive hover:text-white hover:bg-destructive border hover:border-destructive transition-all duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("locations")}
                      className="text-[hsl(200_100%_50%)] hover:text-white hover:bg-[hsl(200_100%_50%)] border hover:border-[hsl(200_100%_50%)] transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                </div>

                {/* Keywords */}
                <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                  <h3 className="font-bold text-lg text-foreground">Keywords</h3>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Search Keywords
                    </Label>
                    {formData.keywords.map((keyword, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={keyword}
                          onChange={(e) => handleArrayChange("keywords", index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                          placeholder={`Keyword ${index + 1}`}
                        />
                        {formData.keywords.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("keywords", index)}
                            className="px-4 text-destructive hover:text-white hover:bg-destructive border hover:border-destructive transition-all duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("keywords")}
                      className="text-[hsl(45_100%_50%)] hover:text-white hover:bg-[hsl(45_100%_50%)] border hover:border-[hsl(45_100%_50%)] transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Keyword
                    </Button>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-6 p-6 bg-muted rounded-xl border shadow-soft">
                <h3 className="font-bold text-xl text-foreground">Options</h3>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div>
                    <Label htmlFor="popular" className="font-semibold">
                      Mark as Popular
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Feature this test prominently on the website
                    </p>
                  </div>
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => debouncedHandleInputChange("popular", checked)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 text-lg border hover:bg-muted transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 text-lg bg-gradient-to-r from-primary to-[hsl(248_81%_20%)] hover:from-primary/90 hover:to-[hsl(248_81%_15%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === "edit" ? "Updating..." : "Creating..."}
                    </span>
                  ) : mode === "edit" ? "Update Test" : "Create Test"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-80 border-l pl-8 overflow-y-auto">
            <div className="sticky top-0 bg-background py-6 rounded-xl">
              <h3 className="font-bold text-xl text-foreground mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-primary" />
                Live Preview
              </h3>

              <div className="bg-muted border rounded-xl p-6 space-y-6 shadow-soft">
                <div>
                  <h4 className="font-bold text-xl text-foreground line-clamp-2">
                    {formData.name || "Test Name"}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {formData.description || "Test description will appear here..."}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedCategory && (
                    <Badge className="text-white font-medium" style={{ backgroundColor: selectedCategory.color }}>
                      {selectedCategory.label}
                    </Badge>
                  )}
                  {formData.popular && (
                    <Badge className="bg-gradient-to-r from-primary to-[hsl(248_81%_20%)] text-white font-medium">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-3 text-[hsl(200_100%_50%)]" />
                      <span>{formData.duration || "Duration not set"}</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-3 text-[hsl(45_100%_50%)]" />
                      <span>Reports in {reportTimeDisplay}</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-3 text-[hsl(248_81%_20%)]" />
                      <span>{formData.parameterCount || "0"} Parameters</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="line-clamp-2">
                        {formData.parts.filter((p) => p.trim()).join(", ") || "No parts added"}
                      </span>
                    </div>
                  </div>
                </div>

                {formData.parameters.filter((p) => p.trim()).length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm text-foreground">
                      Parameters:
                    </h5>
                    <div className="max-h-32 overflow-y-auto">
                      {formData.parameters
                        .filter((p) => p.trim())
                        .map((parameter, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs text-muted-foreground py-1"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                            <span>{parameter}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {formData.about && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm text-foreground">
                      About this test:
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-4">
                      {formData.about}
                    </p>
                  </div>
                )}

                {formData.locations.filter((l) => l.trim()).length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm text-foreground">
                      Available at:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {formData.locations
                        .filter((l) => l.trim())
                        .slice(0, 3)
                        .map((location, index) => (
                          <span
                            key={index}
                            className="inline-block bg-[hsl(200_100%_50%/0.1)] text-[hsl(200_100%_50%)] px-2 py-1 rounded text-xs"
                          >
                            {location}
                          </span>
                        ))}
                      {formData.locations.filter((l) => l.trim()).length > 3 && (
                        <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                          +{formData.locations.filter((l) => l.trim()).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TestModal