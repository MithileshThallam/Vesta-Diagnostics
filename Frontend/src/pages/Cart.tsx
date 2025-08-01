"use client"

import { Trash2, ShoppingBag, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTestCartStore } from "@/store/testCartStore"
import Header from "@/components/Header"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { tests, removeTest, clearCart, totalAmount, totalCount } = useTestCartStore()
  const navigate = useNavigate();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleRemoveTest = (id: string) => {
    removeTest(id)
  }

  const handleClearCart = () => {
    clearCart()
  }

  const handleProceedToBook = () => {
    // TODO: Navigate to booking/checkout page
    console.log("Proceeding to book tests:", tests)
  }

  const handleContinueShopping = () => {
    navigate('/tests');
  }

  // Empty cart state
  if (tests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center py-16">
              {/* Empty State Illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-slate-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-vesta-orange rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">0</span>
                </div>
              </div>

              {/* Empty State Content */}
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                No tests added yet. Explore our comprehensive range of diagnostic tests and add them to get started with
                your health journey.
              </p>

              {/* Action Button */}
              <Button onClick={handleContinueShopping} variant="premium" size="lg" className="text-lg px-8 py-4 h-auto">
                <Plus className="w-5 h-5 mr-2" />
                Explore Tests
              </Button>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">250+ Tests</h3>
                  <p className="text-sm text-slate-600">Comprehensive diagnostic solutions</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Fast Results</h3>
                  <p className="text-sm text-slate-600">Quick turnaround times</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">8 Cities</h3>
                  <p className="text-sm text-slate-600">Convenient locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <div className="pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Your Cart</h1>
            <p className="text-lg text-slate-600">
              {totalCount()} test{totalCount() !== 1 ? "s" : ""} selected for booking
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {tests.map((test, index) => (
                <Card
                  key={test.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-soft bg-white/90 backdrop-blur-sm"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      {/* Test Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-4">
                          {/* Test Image Placeholder */}
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <span className="text-2xl">
                              {test.category === "neurological"
                                ? "🧠"
                                : test.category === "cardiology"
                                  ? "❤️"
                                  : test.category === "radiology"
                                    ? "📡"
                                    : test.category === "laboratory"
                                      ? "🔬"
                                      : test.category === "genetic"
                                        ? "🧬"
                                        : "🛡️"}
                            </span>
                          </div>

                          {/* Test Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-vesta-orange transition-colors">
                              {test.name}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2 capitalize">
                              {test.category} • {test.duration}
                            </p>
                            <div className="text-xl font-bold text-vesta-orange">{test.priceDisplay}</div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        onClick={() => handleRemoveTest(test.id)}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 ml-4"
                        aria-label={`Remove ${test.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <div className="pt-6">
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="bg-transparent border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Tests
                </Button>
              </div>
            </div>

            {/* Checkout Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-0 shadow-medium bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {/* Order Summary Header */}
                    <div className="border-b border-slate-200 pb-4 mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
                    </div>

                    {/* Summary Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-slate-600">
                        <span>Tests ({totalCount()})</span>
                        <span>{formatPrice(totalAmount())}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Service Fee</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Home Collection</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex justify-between text-lg font-semibold text-slate-900">
                          <span>Total Amount</span>
                          <span className="text-vesta-orange">{formatPrice(totalAmount())}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button onClick={handleProceedToBook} variant="premium" size="lg" className="w-full text-lg h-12">
                        Proceed to Book
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>

                      <Button
                        onClick={handleClearCart}
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl mb-1">🔒</div>
                          <div className="text-xs text-slate-600">Secure Booking</div>
                        </div>
                        <div>
                          <div className="text-2xl mb-1">✅</div>
                          <div className="text-xs text-slate-600">NABL Certified</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Sticky Footer */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 z-40">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-slate-600">{totalCount()} tests</div>
                      <div className="text-lg font-bold text-vesta-orange">{formatPrice(totalAmount())}</div>
                    </div>
                    <Button onClick={handleProceedToBook} variant="premium" size="lg" className="px-8">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart