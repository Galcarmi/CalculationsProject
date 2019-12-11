import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CreateCalculationMutation } from '../graphql/queries/mutations';
import './values-form-page.scss';

function ValuesFormPage(props) {
  const inputNumber1 = React.createRef();
  const inputNumber2 = React.createRef();
  const [createCalculationMutation] = useMutation(CreateCalculationMutation);

  function handleCreateCalculation(event) {
    event.preventDefault();
    createCalculationMutation({
      variables: {
        Number1: +inputNumber1.current.value,
        Number2: +inputNumber2.current.value
      }
    });
    props.history.push('/');
  }
  return (
    <div className={'form-component'}>
      <form onSubmit={handleCreateCalculation} className={'calculation-form'}>
        <h2>Add calculation!</h2>
        <div className={'form-group'}>
          <label htmlFor="exampleInputEmail1">First number</label>
          <input
            type="text"
            className={'form-control'}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={inputNumber1}
          />
        </div>
        <div className={'form-group'}>
          <label htmlFor="exampleInputPassword1">Second number</label>
          <input
            type="text"
            className={'form-control'}
            id="exampleInputPassword1"
            ref={inputNumber2}
          />
        </div>
        <button type="submit" className={'btn btn-primary'}>
          Calculate!
        </button>
      </form>
    </div>
  );
}

export default ValuesFormPage;
