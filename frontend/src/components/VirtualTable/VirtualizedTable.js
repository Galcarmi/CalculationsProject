import React from 'react';
import { Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './virtualized-table.scss';

//"zebra" rows
function styleRows(row) {
  if (row.index % 2) {
    return {
      backgroundColor: '#b7b9bd',
      color: '#333'
    };
  } else {
    return {
      backgroundColor: '#fff',
      color: '#333'
    };
  }
}

const VirtualizedTable = ({ rows, ...props }) => (
  <div className={props.className}>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          rowGetter={({ index }) => rows[index]}
          {...props}
          rowStyle={styleRows}
          className={''}
        />
      )}
    </AutoSizer>
  </div>
);

export default VirtualizedTable;
