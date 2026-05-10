import { type ReactNode } from 'react'

interface DataTableColumn<T extends object> {
  label: string
  accessor: keyof T
  render?: (item: T) => ReactNode
}

interface DataTableProps<T extends object> {
  columns: Array<DataTableColumn<T>>
  data: T[]
  emptyMessage?: string
}

export function DataTable<T extends object>({ columns, data, emptyMessage = 'No records found.' }: DataTableProps<T>) {
  if (!data?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} className="px-5 py-4 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t border-slate-100 hover:bg-slate-50">
              {columns.map((column) => {
                const rendered = column.render ? column.render(item) : item[column.accessor]
                const cellValue = rendered === null || rendered === undefined ? '-' : rendered
                return (
                  <td key={String(column.accessor)} className="px-5 py-4 align-top text-slate-700">
                    {cellValue as React.ReactNode}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
