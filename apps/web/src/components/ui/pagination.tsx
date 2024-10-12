import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex w-[99%] items-center justify-between">
      <span className="text-sm text-slate-200">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium text-slate-200">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(0)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-950 p-0 text-slate-200 transition-colors hover:bg-slate-800"
            disabled={pageIndex === 0}
          >
            <CaretDoubleLeft className="h-4 w-4" weight="bold" />
            <span className="sr-only">Primeira página</span>
          </button>
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-950 p-0 text-slate-200 transition-colors hover:bg-slate-800"
            disabled={pageIndex === 0}
          >
            <CaretLeft className="h-4 w-4" weight="bold" />
            <span className="sr-only">Página anterior</span>
          </button>
          <button
            onClick={() => onPageChange(pageIndex + 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-950 p-0 text-slate-200 transition-colors hover:bg-slate-800"
            disabled={pages <= pageIndex + 1}
          >
            <CaretRight className="h-4 w-4" weight="bold" />
            <span className="sr-only">Próxima página</span>
          </button>
          <button
            onClick={() => onPageChange(pages - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-950 p-0 text-slate-200 transition-colors hover:bg-slate-800"
            disabled={pages <= pageIndex + 1}
          >
            <CaretDoubleRight className="h-4 w-4" weight="bold" />
            <span className="sr-only">Última página</span>
          </button>
        </div>
      </div>
    </div>
  )
}
