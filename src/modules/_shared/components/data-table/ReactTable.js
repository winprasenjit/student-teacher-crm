import React, {useState, useEffect, useMemo, useReducer} from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender,
} from '@tanstack/react-table'
import { Table as BTable } from 'react-bootstrap'
import Filter from "./Filter";
import ActionButtons from "./ActionButtons";
import DebouncedInput from "./DebounceInput";

/*const defaultColumn = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      ;(table.options.meta).updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
};*/

/*const fuzzyFilter = (
  row,
  columnId,
  value,
  addMeta
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
};*/
const getTableMeta = (setData,skipAutoResetPageIndex) =>
({
  updateData: (rowIndex, columnId, value) => {
    // Skip age index reset until after next rerender
    skipAutoResetPageIndex()
    setData(old =>
      old.map((row, index) => {
        if (index !== rowIndex) return row

        return {
          ...old[rowIndex],
          [columnId]: value,
      }
      })
    )
  },
});
const autoResetPageIndex = true;

export default function ReactTable({columns, rows = []}) {
  const getTableHeaderGroups = (table,tg) => {
    if (tg === 'left') {
      return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()]
    }

    if (tg === 'right') {
      return [table.getRightHeaderGroups(), table.getRightFooterGroups()]
    }

    if (tg === 'center') {
      return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()]
    }

    return [table.getHeaderGroups(), table.getFooterGroups()]
  };
  const getRowGroup = (row, tg) => {
    if (tg === 'left') return row.getLeftVisibleCells()
    if (tg === 'right') return row.getRightVisibleCells()
    if (tg === 'center') return row.getCenterVisibleCells()
    return row.getVisibleCells()
  };
  
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [grouping, setGrouping] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSplit, setIsSplit] = useState(false)
  const columnList = useMemo(
    () => columns.map(column => ({
      header: column.label,
      footer: props => props.column.id,
      accessorKey: column.dataField,
      cell: info => info.getValue(),
      ...column
    })), [columns]);
  const [data, setData] = useState([]);
  const [{pageIndex, pageSize}, setPagination] = useState({pageIndex: 1, pageSize: 10});
  const [pageCount, setPageCount] = useState(0);
  const pagination = useMemo(() => ({
    pageIndex,
    pageSize,
  }), [pageIndex, pageSize]);
  const rerender = useReducer(() => ({}), {})[1]

  /*useEffect(() => {
    if (rows) {
      setPageCount(Math.ceil(rows.length / pageSize));
      setData(rows.slice((pageIndex * pageSize), ((pageIndex + 1) * pageSize)));
    }
    console.log(pageIndex, pageSize);
  }, [pageIndex, pageSize])*/

  useEffect(() => {
    if (rows) {
      setData(rows);
    }
  },[rows]);
 
  const table = useReactTable({
    data,
    columns: columnList,
    // defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    //globalFilterFn: fuzzyFilter,
    autoResetPageIndex,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    // Provide our updateData function to our table meta
    //meta: getTableMeta(setData, true),
    state: {
      grouping,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
      rowSelection,
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });
  const [headerGroups, footerGroup] = getTableHeaderGroups(table, 'center');
  
  return (data &&
      <>
        <div className="p-2 grid grid-cols-4 gap-4">
          <div className="mb-2 input-style-1">
            Search:
            <DebouncedInput
              value={globalFilter || ''}
              onChange={value => setGlobalFilter(value)}
              className="mx-1 p-2 font-lg shadow w-25"
              placeholder="Search all columns..."
            />
          </div>
          {/* <div className="p-2 inline-block border border-black shadow rounded">
            <div className="px-1 border-b border-black">
              <label>
                <input
                  type="checkbox"
                  checked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                  className="mr-1"
                />
                Toggle All
              </label>
            </div>
            {table.getAllLeafColumns().map(column => {
              return (
                <div key={column.id} className="px-1">
                  <label>
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="mr-1"
                    />
                    {column.id}
                  </label>
                </div>
              )
            })}
          </div> */}
        </div>
        <BTable hover responsive size="sm" className="input-style-1">
          <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  className="relative"
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div>
                        {header.column.getCanGroup() && false ? (
                          // If the header can be grouped, let's add a toggle
                          <button
                            onClick={header.column.getToggleGroupingHandler()}
                            style={{
                              cursor: 'pointer',
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `🛑(${header.column.getGroupedIndex()})`
                              : `👊`}
                          </button>
                        ) : null}{' '}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{' '}
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : ''
                          }
                        >
                          {{
                            asc: <i className="lni lni-sort-amount-asc"></i>,
                            desc: <i className="lni lni-sort-amount-dsc"></i>,
                          }[header.column.getIsSorted()] ?? <i className="lni lni-sort-alpha-asc"></i>}
                        </button>
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </>
                  )}
                  <div
                    className="absolute right-0 top-0 h-full w-1 bg-blue-300 select-none touch-none hover:bg-blue-500 cursor-col-resize"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  />
                  {/*!header.isPlaceholder && header.column.getCanPin() && (
                    <TablePins
                      isPinned={header.column.getIsPinned()}
                      pin={header.column.pin}
                    />
                  )*/}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {getRowGroup(row, 'center').map(cell => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </BTable>
        <ActionButtons
          getSelectedRowModel={table.getSelectedRowModel}
          hasNextPage={table.getCanNextPage()}
          hasPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          previousPage={table.previousPage}
          //refreshData={refreshData}
          rerender={rerender}
          rowSelection={rowSelection}
          setPageIndex={table.setPageIndex}
          setPageSize={table.setPageSize}
          totalRows={table.getPrePaginationRowModel().rows.length}
        />
      </>
  )
}