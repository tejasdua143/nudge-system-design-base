"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { ChevronDown } from "lucide-react"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <Button variant="outline" size="icon">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  )
}
