import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { Column } from 'react-virtualized';

import Paginator from '../components/VirtualTable/Paginator';
import VirtualizedTable from '../components/VirtualTable/VirtualizedTable';
import EditCalculation from '../components/VirtualTable/EditCalculation';
import FilterCalculations from '../components/VirtualTable/FilterCalculations';
import Options from '../components/VirtualTable/Options';
import ColumnWidth from '../components/VirtualTable/ColumnWidth';

import calculationQuery from '../graphql/queries/queries';
import { DeleteCalculationMutation } from '../graphql/queries/mutations';
import { CalculationsSubscription } from '../graphql/queries/subscriptions';
import './calculation-page.scss';

function EventsPage() {
  //graphql variables
  const { data, loading } = useQuery(calculationQuery);
  const [deleteCalculationMutation] = useMutation(DeleteCalculationMutation);
  const { data: calculationsSubscription } = useSubscription(
    CalculationsSubscription,
    {
      variables: {}
    }
  );

  //local state management
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [scrollToIndex, setScrollToIndex] = useState();
  const [rowHeight, setRowHeight] = useState(40);
  const [tableData, setTableData] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sortBy: null,
    sortDirection: null
  });
  const [editData, setEditData] = useState({ visible: false, data: null });
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [filterMode, setFilterMode] = useState(false);

  //column width local state

  const [column1Width, setColumn1Width] = useState(250);
  const [column2Width, setColumn2Width] = useState(250);
  const [column3Width, setColumn3Width] = useState(250);
  const [column4Width, setColumn4Width] = useState(300);

  //dynamically make changes between regular tabledata and filtered table data
  let currentTableData;
  if (filterMode) {
    currentTableData = filteredTableData;
  } else {
    currentTableData = tableData;
  }

  //virtual table variables
  const headerHeight = 30;
  const height = rowHeight * perPage + headerHeight;
  const rowCount = currentTableData.length;
  const pageCount = Math.ceil(rowCount / perPage);

  function handleRowsScroll({ stopIndex }) {
    const page = Math.ceil(stopIndex / perPage);
    setPage(page);
  }

  function handlePageChange(page) {
    const scrollToIndex = (page - 1) * perPage;
    setPage(page);
    setScrollToIndex(scrollToIndex);
  }

  function handleRowHeightChange(value) {
    let height;
    if (value === 'small') {
      height = 20;
    } else if (value === 'medium') {
      height = 40;
    } else {
      height = 60;
    }
    setRowHeight(height);
  }

  function handleItemsPerPageChange(value) {
    setPerPage(+value);
  }

  function handleColumnClick(event) {
    if (Array.from(event.event.target.classList)[1] === 'column-delete') {
      handleCalculationDelete(event);
    } else if (Array.from(event.event.target.classList)[1] === 'column-edit') {
      handleCalculationEdit(event);
    }
  }

  function handleCalculationDelete(event) {
    const index =
      event.event.target.parentNode.getAttribute('aria-rowindex') - 1;
    const calculationId = currentTableData[index]._id;
    deleteCalculationMutation({
      variables: {
        _id: calculationId
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCalculationEdit(event) {
    const index =
      event.event.target.parentNode.getAttribute('aria-rowindex') - 1;
    const calculationData = currentTableData[index];
    setEditData({ visible: true, data: calculationData });
  }

  function handleSort(sortData) {
    setSortOptions({
      sortBy: sortData.sortBy,
      sortDirection: sortData.sortDirection
    });
    if (sortData.sortDirection === 'ASC') {
      setTableData(
        currentTableData.sort((calculation1, calculation2) => {
          return calculation1[sortData.sortBy] - calculation2[sortData.sortBy];
        })
      );
    } else {
      setTableData(
        currentTableData.sort((calculation1, calculation2) => {
          return calculation2[sortData.sortBy] - calculation1[sortData.sortBy];
        })
      );
    }
  }

  function refreshTableAfterCreate(calculation) {
    console.log(tableData);
    setTableData([
      { ...calculation, delete: 'delete', edit: 'edit' },
      ...tableData
    ]);
  }
  function refreshTableAfterDelete(calculation) {
    setTableData(
      tableData.filter(calculationItem => {
        return calculation._id !== calculationItem._id;
      })
    );
    if (filterMode) {
      setFilteredTableData(
        filteredTableData.filter(calculationItem => {
          return calculation._id !== calculationItem._id;
        })
      );
    }
  }
  function refreshTableAfterEdit(calculation) {
    setTableData(
      tableData.map(calculationItem => {
        if (calculation._id === calculationItem._id) {
          return { ...calculation, edit: 'edit', delete: 'delete' };
        } else {
          return calculationItem;
        }
      })
    );
    if (filterMode) {
      setFilteredTableData(
        filteredTableData.map(calculationItem => {
          if (calculation._id === calculationItem._id) {
            return { ...calculation, edit: 'edit', delete: 'delete' };
          } else {
            return calculationItem;
          }
        })
      );
    }
  }

  useEffect(() => {
    let tempTableData = [];
    if (data) {
      tempTableData = data.getCalculations.map(calculation => {
        return {
          ...calculation,
          delete: 'delete',
          edit: 'edit'
        };
      });
    }
    if (tempTableData.length > 0) {
      setTableData([...tempTableData]);
      setFilteredTableData([...tempTableData]);
    }
  }, [data, loading]);

  useEffect(() => {
    if (calculationsSubscription) {
      const calculationData = calculationsSubscription.calculationsSubscription;
      if (calculationData.type === 'delete')
        refreshTableAfterDelete(calculationData);
      else if (calculationData.type === 'edit') {
        refreshTableAfterEdit(calculationData);
      } else if (calculationData.type === 'new') {
        refreshTableAfterCreate(calculationData);
      }
    }
    // eslint-disable-next-line
  }, [calculationsSubscription]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className={'calculation-component'}>
      <h1>Gal's virtual table</h1>
      <ColumnWidth
        column1Width={column1Width}
        column2Width={column2Width}
        column3Width={column4Width}
        column4Width={column4Width}
        setColumn1Width={setColumn1Width}
        setColumn2Width={setColumn2Width}
        setColumn3Width={setColumn3Width}
        setColumn4Width={setColumn4Width}
      ></ColumnWidth>
      <div className={'virtual-table'}>
        <VirtualizedTable
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          height={height}
          rowCount={rowCount}
          rows={currentTableData}
          onRowsRendered={handleRowsScroll}
          scrollToIndex={scrollToIndex}
          scrollToAlignment="start"
          onColumnClick={handleColumnClick}
          sort={handleSort}
          sortBy={sortOptions.sortBy}
          sortDirection={sortOptions.sortDirection}
          className={'virtual-table-component'}
        >
          <Column label="Number1" dataKey="Number1" width={column1Width} />
          <Column label="Number2" dataKey="Number2" width={column2Width} />
          <Column label="Sum" dataKey="Sum" width={column3Width} />
          <Column
            label="Multiplication"
            dataKey="Multiplication"
            width={column4Width}
          />
          <Column
            label=" "
            dataKey="delete"
            width={100}
            className={'column-delete'}
          />
          <Column
            label=" "
            dataKey="edit"
            width={100}
            className={'column-edit'}
          />
        </VirtualizedTable>
      </div>
      {editData.visible && (
        <EditCalculation
          className={'edit-section'}
          setEditData={setEditData}
          calculationToEdit={editData.data}
        ></EditCalculation>
      )}

      <div className={'paginator'}>
        <Paginator
          pageCount={pageCount}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
      <div className={'options-section'}>
        <h1>Options section</h1>
        <Options
          options={['small', 'medium', 'large']}
          data={'Row-Height'}
          changeHandler={handleRowHeightChange}
          default={'medium'}
        ></Options>
        <Options
          options={['5', '10', '20']}
          data={'Items per page'}
          changeHandler={handleItemsPerPageChange}
          default={'5'}
        ></Options>
      </div>
      <FilterCalculations
        className={'filter-section'}
        tableData={tableData}
        filteredTableData={filteredTableData}
        setFilteredTableData={setFilteredTableData}
        setFilterMode={setFilterMode}
        filterMode={filterMode}
      ></FilterCalculations>
    </div>
  );
}

export default EventsPage;
