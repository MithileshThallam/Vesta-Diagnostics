import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartTest {
  id: string
  name: string
  price: number
  priceDisplay: string
  category: string
  duration: string
}

interface TestCartState {
  tests: CartTest[]
  addTest: (test: CartTest) => void
  removeTest: (id: string) => void
  clearCart: () => void
  totalAmount: () => number
  totalCount: () => number
  isTestInCart: (id: string) => boolean
}

export const useTestCartStore = create<TestCartState>()(
  persist(
    (set, get) => ({
      tests: [],

      addTest: (test: CartTest) => {
        const { tests } = get()
        // Only add if not already in cart (deduplication)
        if (!tests.some((t) => t.id === test.id)) {
          set({ tests: [...tests, test] })
        }
      },

      removeTest: (id: string) => {
        set((state) => ({
          tests: state.tests.filter((test) => test.id !== id),
        }))
      },

      clearCart: () => {
        set({ tests: [] })
      },

      totalAmount: () => {
        const { tests } = get()
        return tests.reduce((total, test) => total + test.price, 0)
      },

      totalCount: () => {
        const { tests } = get()
        return tests.length
      },

      isTestInCart: (id: string) => {
        const { tests } = get()
        return tests.some((test) => test.id === id)
      },
    }),
    {
      name: "vesta-test-cart",
      // Only persist the tests array, computed values are derived
      partialize: (state) => ({ tests: state.tests }),
    },
  ),
)
