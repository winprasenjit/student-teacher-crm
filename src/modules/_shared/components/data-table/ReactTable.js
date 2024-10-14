import React, { useState, useEffect, useMemo, useReducer } from 'react';
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
} from '@tanstack/react-table';
import { Table as BTable } from 'react-bootstrap';
import Filter from './Filter';
import ActionButtons from './ActionButtons';
import DebouncedInput from './DebounceInput';
import TablePins from './TablePins';

const autoResetPageIndex = true;

const getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
      ? '4px 0 4px -4px gray inset'
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export default function ReactTable({
  columns,
  rows = [],
  tableGroup,
  actionColumn,
}) {
  let pinned = false;
  const getTableHeaderGroups = (table, tg) => {
    if (tg === 'left') {
      return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()];
    }

    if (tg === 'right') {
      return [table.getRightHeaderGroups(), table.getRightFooterGroups()];
    }

    if (tg === 'center') {
      return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()];
    }

    return [table.getHeaderGroups(), table.getFooterGroups()];
  };

  const getRowGroup = (row, tg) => {
    if (tg === 'left') return row.getLeftVisibleCells();
    if (tg === 'right') return row.getRightVisibleCells();
    if (tg === 'center') return row.getCenterVisibleCells();
    return row.getVisibleCells();
  };

  const onActionItemClick = (cellInfo, action) =>
    action(cellInfo?.row?.original);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [grouping, setGrouping] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const columnList = useMemo(() => {
    const cols = columns.map((column) => ({
      header: column.label,
      footer: (props) => props.column.id,
      accessorKey: column.dataField,
      cell: (info) => info.getValue(),
      ...column,
    }));
    if (actionColumn) {
      cols.push({
        id: 'actionColumn',
        header: '',
        footer: 100,
        accessorKey: 'column.dataField',
        enableColumnFilter: false,
        enableSorting: false,
        pin: 'right',
        cell: (info) => {
          return (
            <div className="actionColumn">
              <i onClick={() => onActionItemClick(info, actionColumn.edit)} className="lni lni-pencil"></i>
              &nbsp;
              <i onClick={() => onActionItemClick(info, actionColumn.delete)} className="lni lni-trash-can"></i>
            </div>
          );
        },
      });
    }
    return cols;
  }, [columns, actionColumn]);

  useEffect(() => {
    if (rows) {
      setData(rows);
    }
  }, [rows]);

  const table = useReactTable({
    data,
    columns: columnList,
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
    autoResetPageIndex,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
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
  const [headerGroups] = getTableHeaderGroups(table, tableGroup);

  return (
    data && (
      <>
        <div className="p-2 grid grid-cols-4 gap-4">
          <div className="mb-2 input-style-1">
            Search:
            <DebouncedInput
              value={globalFilter || ''}
              onChange={(value) => setGlobalFilter(value)}
              className="mx-1 p-2 font-lg shadow w-25"
              placeholder="Search all columns..."
            />
          </div>
        </div>
        <BTable hover responsive size="sm" className="input-style-1 tenstack-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  if(column.id === 'actionColumn' && !header.column.getIsPinned()) {
                    header.column.pin('right');
                    pinned = true;
                  }
                  return (
                    <th
                      className={column.id === 'actionColumn' ? "relative actionColumn" : "relative"}
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        ...getCommonPinningStyles(column),
                      }}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div>
                            {header.column.getCanGroup() && false ? ( // TODO : Remove false later
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
                            {header.column.getCanSort() && (
                              <button
                                onClick={header.column.getToggleSortingHandler()}
                                className={
                                  header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : ''
                                }
                              >
                                {{
                                  asc: (
                                    <i className="lni lni-sort-amount-asc"></i>
                                  ),
                                  desc: (
                                    <i className="lni lni-sort-amount-dsc"></i>
                                  ),
                                }[header.column.getIsSorted()] ?? (
                                  <i className="lni lni-sort-alpha-asc"></i>
                                )}
                              </button>
                            )}
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
                      {false &&
                        !header.isPlaceholder &&
                        header.column.getCanPin() && ( // TODO : Remove false later
                          <TablePins
                            isPinned={header.column.getIsPinned()}
                            pin={header.column.pin}
                          />
                        )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {getRowGroup(row, tableGroup).map((cell) => {
                  const { column } = cell;
                  return (
                    <td
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        ...getCommonPinningStyles(column),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
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
          rowSelection={rowSelection}
          setPageIndex={table.setPageIndex}
          setPageSize={table.setPageSize}
          totalRows={table.getPrePaginationRowModel().rows.length}
        />
      </>
    )
  );
}
