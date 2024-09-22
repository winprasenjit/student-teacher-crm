
import React from 'react'

export function ActionButtons({
  getSelectedRowModel,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  rowSelection,
  setPageIndex,
  setPageSize,
  totalRows,
}) {
  return (
    <React.Fragment>
      <div className="d-flex pagination-container pt-3">
        <div className="bd-highlight total-page-section">
          <div>{totalRows} Rows</div>
        </div>
        <div className="bd-highlight select-section">
          <span className="d-flex items-center gap-1">
            <div>Page</div>
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </span>
          <span className="flex ms-2 gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                setPageIndex(page)
              }}
              className="border p-1 rounded go-to-page-input"
            />
          </span>
          <select
            className="border p-1 rounded"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="bd-highlight navigate-section">
          <button
            className="border rounded p-1"
            onClick={() => setPageIndex(0)}
            disabled={!hasPreviousPage}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => previousPage()}
            disabled={!hasPreviousPage}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => nextPage()}
            disabled={!hasNextPage}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!hasNextPage}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ActionButtons
