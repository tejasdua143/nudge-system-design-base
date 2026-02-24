"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Mail } from "lucide-react"
import { ComponentPlayground } from "@/components/docs/component-playground"
import { Separator } from "@/components/ui/separator"
import { getIcon, LEADING_ICON_OPTIONS, TRAILING_ICON_OPTIONS } from "@/components/docs/icon-picker"

export function ButtonDemo() {
  return (
    <div className="space-y-6">
      <ComponentPlayground
        controls={[
          {
            type: "select",
            name: "variant",
            label: "Variant",
            options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
          },
          {
            type: "select",
            name: "size",
            label: "Size",
            options: ["default", "sm", "lg", "icon"],
          },
          { type: "boolean", name: "disabled", label: "Disabled" },
          { type: "text", name: "children", label: "Label", defaultValue: "Button" },
          {
            type: "select",
            name: "leadingIcon",
            label: "Leading Icon",
            options: LEADING_ICON_OPTIONS,
            defaultValue: "none",
          },
          {
            type: "select",
            name: "trailingIcon",
            label: "Trailing Icon",
            options: TRAILING_ICON_OPTIONS,
            defaultValue: "none",
          },
        ]}
        render={(props) => {
          const LeadingIcon = getIcon(props.leadingIcon as string)
          const TrailingIcon = getIcon(props.trailingIcon as string)
          const isIcon = props.size === "icon"

          return (
            <Button
              variant={props.variant as "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"}
              size={props.size as "default" | "sm" | "lg" | "icon"}
              disabled={props.disabled as boolean}
            >
              {isIcon ? (
                <Mail />
              ) : (
                <>
                  {LeadingIcon ? <LeadingIcon /> : null}
                  {(props.children as string) || "Button"}
                  {TrailingIcon ? <TrailingIcon /> : null}
                </>
              )}
            </Button>
          )
        }}
      />

      <Separator />

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Examples
        </p>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>
            <Loader2 className="animate-spin" /> Loading
          </Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Mail />
          </Button>
        </div>
      </div>
    </div>
  )
}
