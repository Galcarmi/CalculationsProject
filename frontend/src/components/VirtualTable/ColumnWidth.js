import React from 'react';
import { Icon } from 'semantic-ui-react';

function ColumnWidth(props) {
  function reduceColumn1Width(event) {
    props.setColumn1Width(props.column1Width - 10);
  }
  function enlargeColumn1Width(event) {
    props.setColumn1Width(props.column1Width + 10);
  }
  function reduceColumn2Width(event) {
    props.setColumn2Width(props.column2Width - 10);
  }
  function enlargeColumn2Width(event) {
    props.setColumn2Width(props.column2Width + 10);
  }
  function reduceColumn3Width(event) {
    props.setColumn3Width(props.column3Width - 10);
  }
  function enlargeColumn3Width(event) {
    props.setColumn3Width(props.column3Width + 10);
  }
  function reduceColumn4Width(event) {
    props.setColumn4Width(props.column4Width - 10);
  }
  function enlargeColumn4Width(event) {
    props.setColumn4Width(props.column4Width + 10);
  }

  return (
    <div className={'column-width-component'}>
      <div className={'column1-width'}>
        <Icon
          name={'angle left'}
          size={'large'}
          className={'g-icon'}
          onClick={reduceColumn1Width}
        ></Icon>
        <p>Number1 width</p>
        <Icon
          name={'angle right'}
          size={'large'}
          className={'g-icon'}
          onClick={enlargeColumn1Width}
        ></Icon>
      </div>
      <div className={'column2-width'}>
        <Icon
          name={'angle left'}
          size={'large'}
          className={'g-icon'}
          onClick={reduceColumn2Width}
        ></Icon>
        <p>Number2 width</p>
        <Icon
          name={'angle right'}
          size={'large'}
          className={'g-icon'}
          onClick={enlargeColumn2Width}
        ></Icon>
      </div>
      <div className={'column3-width'}>
        <Icon
          name={'angle left'}
          size={'large'}
          className={'g-icon'}
          onClick={reduceColumn3Width}
        ></Icon>
        <p>Sum width</p>
        <Icon
          name={'angle right'}
          size={'large'}
          className={'g-icon'}
          onClick={enlargeColumn3Width}
        ></Icon>
      </div>
      <div className={'column4-width'}>
        <Icon
          name={'angle left'}
          size={'large'}
          className={'g-icon'}
          onClick={reduceColumn4Width}
        ></Icon>
        <p>Multiplication width</p>
        <Icon
          name={'angle right'}
          size={'large'}
          className={'g-icon'}
          onClick={enlargeColumn4Width}
        ></Icon>
      </div>
    </div>
  );
}

export default ColumnWidth;
