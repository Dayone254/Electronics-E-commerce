"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UniversalFilterSidebar } from "./universal-filter-sidebar"

export function FilterMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden bg-white border-2 border-blue-200 hover:bg-blue-50 p-2">
          <Filter className="h-3 w-3 mr-1 text-blue-600" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
        <SheetHeader className="p-2 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <SheetTitle className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-blue-600" />
            Smart Filters
          </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <UniversalFilterSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}
