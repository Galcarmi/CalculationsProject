import React from 'react';
import { useState, useEffect } from 'react';
import Options from './Options';
import { Input } from 'semantic-ui-react';

function FilterCalculations(props) {
  const variableRef = React.createRef();

  const [filterData, setFilterData] = useState({
    inputVariable: '',
    operator: null,
    filterVariable: null
  });

  function handleFilterVariableChange(filterChanged) {
    setFilterData({ ...filterData, filterVariable: filterChanged });
  }

  function handleOperatorChange(operatorChanged) {
    setFilterData({ ...filterData, operator: operatorChanged });
  }

  function handleInputChange(event) {
    if (variableRef.current !== null) {
      setFilterData({
        ...filterData,
        inputVariable: variableRef.current.inputRef.current.value
      });
    } else {
      setFilterData({
        ...filterData,
        inputVariable: ''
      });
    }
  }

  useEffect(() => {
    if (filterData.inputVariable === '') {
      props.setFilteredTableData([...props.tableData]);
      props.setFilterMode(false);
    } else if (filterData.operator && filterData.filterVariable) {
      const parsedVariable = parseInt(filterData.inputVariable);
      if (!props.filterMode) {
        props.setFilterMode(true);
      }
      if (filterData.operator === 'Greater than') {
        props.setFilteredTableData(
          props.tableData.filter(calculation => {
            return calculation[filterData.filterVariable] > parsedVariable;
          })
        );
      } else if (filterData.operator === 'Smaller than') {
        props.setFilteredTableData(
          props.tableData.filter(calculation => {
            return calculation[filterData.filterVariable] < parsedVariable;
          })
        );
      } else {
        props.setFilteredTableData(
          props.tableData.filter(calculation => {
            return calculation[filterData.filterVariable] === parsedVariable;
          })
        );
      }
    } else {
      return;
    }
    //eslint-disable-next-line
  }, [filterData]);

  return (
    <div className={props.className}>
      <h1>Filter Section</h1>
      <Options
        options={['Number1', 'Number2', 'Sum', 'Multiplication']}
        data={'variable to filter'}
        changeHandler={handleFilterVariableChange}
        // default={'medium'}
      ></Options>
      <Options
        options={['Greater than', 'Smaller than', 'Equals to']}
        data={'operator'}
        changeHandler={handleOperatorChange}
        // default={'medium'}
      ></Options>
      <Input
        onChange={handleInputChange}
        ref={variableRef}
        placeholder={'enter value'}
      ></Input>
    </div>
  );
}

export default FilterCalculations;
