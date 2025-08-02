"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Clock, Activity, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { medicalTests } from "@/data/testData"

const TestManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredTests = medicalTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || test.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "neurological":
        return "from-purple-500 to-indigo-600"
      case "cardiology":
        return "from-red-500 to-pink-600"
      case "laboratory":
        return "from-green-500 to-emerald-600"
      case "radiology":
        return "from-blue-500 to-cyan-600"
      case "genetic":
        return "from-orange-500 to-yellow-600"
      case "preventive":
        return "from-teal-500 to-green-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const formatReportTime = (hours: number) => {
    if (hours < 24) return `${hours}h`
    if (hours < 168) return `${Math.floor(hours / 24)}d`
    return `${Math.floor(hours / 168)}w`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Test Management
          </h2>
          <p className="text-slate-400 mt-1">Manage diagnostic tests and parameters</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Test
        </Button>
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
                placeholder="Search tests by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              >
                <option value="all">All Categories</option>
                <option value="neurological">Neurological</option>
                <option value="cardiology">Cardiology</option>
                <option value="laboratory">Laboratory</option>
                <option value="radiology">Radiology</option>
                <option value="genetic">Genetic</option>
                <option value="preventive">Preventive</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Card
            key={test.id}
            className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {test.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(test.category)}`}
                    >
                      {test.category}
                    </span>
                    {test.popular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-vesta-orange">{test.priceDisplay}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{test.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <FileText className="h-4 w-4" />
                  <span>{test.parameterCount} parameters</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Activity className="h-4 w-4" />
                  <span>Report in {formatReportTime(test.reportIn)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{test.parts.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-600/50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-800/50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TestManagement
