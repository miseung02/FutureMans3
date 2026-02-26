"use client"

import { cn } from "@/lib/utils"
import { categories, type Category } from "@/lib/meetup-data"
import { logEvent } from "@/lib/analytics"

interface CategoryTabsProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const handleClick = (category: Category) => {
    logEvent("category_click", { category })
    onCategoryChange(category)
  }

  return (
    <nav className="sticky top-[57px] z-30 border-b border-border bg-background/80 backdrop-blur-xl" aria-label="Category navigation">
      <div className="mx-auto max-w-lg">
        <div className="flex gap-1 overflow-x-auto px-4 py-2 scrollbar-none">
          {categories.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
                activeCategory === label
                  ? "bg-neon text-primary-foreground shadow-neon"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
              aria-pressed={activeCategory === label}
            >
              {emoji && <span aria-hidden="true">{emoji}</span>}
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
