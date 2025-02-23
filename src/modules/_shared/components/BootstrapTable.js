import React, { memo, useEffect, useState } from 'react'

const MAX_CHAR_LENGTH = 2;

const searchItem = (value, field, rows, setRows) => {
  if (value && value.length > MAX_CHAR_LENGTH){
    const filteredArr = rows.filter(obj => obj[field].toLowerCase().indexOf(value) >= 0);
    setRows(filteredArr);
  } else {
    setRows(rows);
  }
};

const BootstrapTable = ({ listData }) => {
  const columns = [{ label: 'Name', dataField: 'name' }, { label: 'Description', dataField: 'description' }];
  const [rows, setRows] = useState(listData);

  useEffect(() => {
    setRows(listData)

    return () => {
      setRows([])
    }
  }, [listData]);


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
            <input type="text" className='grid-inline-search' placeholder={'Search ' + item.label} onKeyUp={(e) => searchItem(e.target.value, item.dataField, listData, setRows)} />
          </td>
          ))}</tr>
          {rows && rows.map((row, rowIndex) => (<tr key={rowIndex}>
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
  );
};

export default memo(BootstrapTable);
