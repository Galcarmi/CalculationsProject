import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function Options(props) {
  const options = props.options.map(option => {
    return { key: option, value: option, text: option };
  });

  return (
    <div>
      <h3>{`${props.data}:`}</h3>
      <Dropdown
        placeholder={`choose ${props.data}`}
        search
        selection
        options={options}
        onChange={(event, data) => props.changeHandler(data.value)}
        defaultValue={props.default}
      />
    </div>
  );
}

export default Options;
