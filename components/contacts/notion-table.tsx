"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface NotionTableColumn<T> {
  key: string
  label: string
  sortable?: boolean
  render: (item: T) => React.ReactNode
  width?: string
}

interface NotionTableProps<T> {
  columns: NotionTableColumn<T>[]
  data: T[]
  onRowClick: (item: T) => void
  getRowKey: (item: T) => string
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

type SortDirection = "asc" | "desc" | null

export function NotionTable<T>({
  columns,
  data,
  onRowClick,
  getRowKey,
  onEdit,
  onDelete,
}: NotionTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0

    const column = columns.find((col) => col.key === sortColumn)
    if (!column) return 0

    const aVal = column.render(a)
    const bVal = column.render(b)

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal
    }

    return 0
  })

  return (
    <div className="w-full">
      {/* Table */}
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        {/* Header */}
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left py-2 px-3 text-xs font-medium text-muted-foreground ${
                  column.sortable ? "cursor-pointer group" : ""
                }`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {column.sortable && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortColumn === column.key ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {/* Actions column */}
            <th className="w-8"></th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sortedData.map((item) => {
            const rowKey = getRowKey(item)
            const isHovered = hoveredRow === rowKey

            return (
              <tr
                key={rowKey}
                className={`cursor-pointer transition-colors ${
                  isHovered ? "bg-gray-50" : ""
                }`}
                onMouseEnter={() => setHoveredRow(rowKey)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onRowClick(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-3 px-3 text-sm"
                  >
                    {column.render(item)}
                  </td>
                ))}

                {/* Actions menu */}
                <td className="py-3 px-3">
                  {(onEdit || onDelete) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={`transition-opacity ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            Upravit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(item)}
                            className="text-red-600"
                          >
                            Smazat
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Žádné záznamy</p>
        </div>
      )}
    </div>
  )
}
