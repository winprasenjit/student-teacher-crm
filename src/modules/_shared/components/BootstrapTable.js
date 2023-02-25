import React, { memo } from 'react'

const BootstrapTable = ({ listData }) => {
  const columns = [{ label: 'Name', dataField: 'name' }, { label: 'Description', dataField: 'description' }];
  // console.log(listData);
  return (
    <div className='table-responsive'>
      <table className='table top-selling-table'>
        <thead>
          <tr>
            {columns.map((item, index) => (
              <th key={index}>
                <h6 className='text-sm text-medium'>
                  {item.label}
                </h6>
              </th>
            )
            )}
          </tr>
        </thead>
        <tbody className="input-style-1">
          <tr>{columns.map((item, index) => (<td style={{ paddingLeft: 0 }} key={item.label}>
            <input type="text" className='grid-inline-search' placeholder={'Search ' + item.label} />
          </td>
          ))}</tr>
          {listData && listData.map((row, rowIndex) => (<tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                <p>{row[col.dataField]}</p>
              </td>
            )
            )}
          </tr>))}
        </tbody>
      </table>
    </div>
  )
};

export default memo(BootstrapTable);
