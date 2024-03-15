import React, { useState } from 'react';
// import DataTable from '../../../../Common/DataTable/DataTable';
import { AccessFileData } from './FileManagerData';

const FileManagerTable = () => {
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [globalFilter, setGlobalFilter] = useState('');
  const sizeOptions = [10, 25, 50, 100]; // Available size options

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };
  const columns = [
    { Header: '', accessor: 'folder', sortable: true },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Share With', accessor: 'shareWith' },
    { Header: 'Owner', accessor: 'owner' },
    { Header: 'Last Update', accessor: 'lastUpdate' },
    { Header: 'Size', accessor: 'size' },
  ];

  const data = AccessFileData.map((data) => {
    return {
      folder: ( <i className={`${data.file_folder} ${data.theme_color}`}></i> ),
      name: ( <span className="folder-name">{data.name}</span> ) ,
      shareWith: (
        <div className="avatar-list ps-3">
          {data.share_with.length === 0 ? (
              <span>-</span>
            ) : (
              data.share_with.map((img, imgIndex) => (
              <img key={imgIndex} className="avatar sm rounded-circle me-1" src={img} data-bs-toggle="tooltip" title="Avatar"/>
            ))
            )}
        </div>
      ),
      owner: ( <span>{data.owner}</span> ),
      lastUpdate: ( <span>{data.last_update}</span> ),
      size: ( <span className="size">{data.size}</span> ),
    };
  });

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="d-flex align-items-center">
        Show{' '}
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="form-select form-select-sm ms-2"
        >
          {sizeOptions.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        &nbsp;entries
      </div>
      <div className="d-flex align-items-center">
        <span className="me-2">Search:</span>
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control form-control-sm"
        />
      </div>
    </div>

    {/* <DataTable
      columns={columns}
      data={data}
      responsive
      striped
      highlightOnHover
      noHeader
    /> */}

    <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing 1 to{' '} 10 of {data.length} entries
        </div>
        <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
          <ul className="pagination">
            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
            </li>
            <li className="paginate_button page-item active">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
            </li>
            <li className="paginate_button page-item next disabled" id="DataTables_Table_0_next">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex="0" className="page-link">Next</a>
            </li>
          </ul>
        </div>
      </div>
      </>
    );
};

export default FileManagerTable;
