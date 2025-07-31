"use client"

import type React from "react"

import { ShoppingCart } from "lucide-react"
import { useTestCartStore } from "@/store/testCartStore"
import { Button } from "@/components/ui/button"

interface CartBadgeProps {
  onClick?: () => void
  className?: string
}

const CartBadge: React.FC<CartBadgeProps> = ({ onClick, className = "" }) => {
  const totalCount = useTestCartStore((state) => state.totalCount())

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior: navigate to cart page
      window.location.href = "/cart"
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={`relative ${className}`}
      aria-label={`Shopping cart with ${totalCount} items`}
    >
      <ShoppingCart className="w-4 h-4" />
      {totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-vesta-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium min-w-[20px] animate-pulse">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </Button>
  )
}

export default CartBadge
