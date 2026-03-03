"use client";

import { Plus, DotsThreeVertical } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const API_KEYS = [
  { name: "Zapier", key: "sk-presentations-...NlV0", created: "3 days ago" },
  { name: "N8N", key: "sk-presentations-...NlV0", created: "5 days ago" },
  { name: "Personal", key: "sk-presentations-...NlV0", created: "8 days ago" },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ApiKeysPage() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden rounded-xl bg-bg-primary shadow-elevation-3">
      {/* Header */}
      <div className="flex h-[63px] items-center justify-between border-b border-border-secondary px-6">
        <h1 className="text-2xl leading-[var(--leading-heading)] tracking-tight text-text-primary">
          API Keys
        </h1>
        <Button variant="primary" size="sm">
          <Plus weight="bold" className="size-3" />
          Create API Key
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[768px] flex-col gap-6 px-6 py-6">
          {/* Description */}
          <p className="text-sm text-text-secondary">
            Your secret API keys are listed below. Please note that we do not
            display your secret API keys again after you generate them. Do not
            share your API key with others, or expose it in the browser or other
            client-side code. You can learn more in our{" "}
            <a href="#" className="font-medium text-text-brand hover:underline">
              API documentation
            </a>
            .
          </p>

          {/* Table */}
          <div className="overflow-hidden rounded-lg shadow-elevation-1">
            {/* Table header */}
            <div className="flex items-center bg-bg-secondary px-4 py-3 text-xs font-medium text-text-secondary">
              <span className="flex-1">Name</span>
              <span className="w-[230px]">API key</span>
              <span className="w-[80px] text-right">Action</span>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-border-tertiary bg-bg-elevated">
              {API_KEYS.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center px-4 py-3 text-sm"
                >
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium text-text-primary">
                      {item.name}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {item.created}
                    </span>
                  </div>
                  <span className="w-[230px] font-mono text-sm text-text-secondary">
                    {item.key}
                  </span>
                  <div className="flex w-[80px] justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                          <DotsThreeVertical
                            weight="bold"
                            className="size-4 text-text-secondary"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Copy key</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          Revoke key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
