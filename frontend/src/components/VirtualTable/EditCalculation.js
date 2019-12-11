import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { EditCalculationMutation } from '../../graphql/queries/mutations';

function EditCalculation(props) {
  const number1Ref = React.createRef();
  const number2Ref = React.createRef();
  const sumRef = React.createRef();
  const multiplicationRef = React.createRef();

  const [editCalculationMutation] = useMutation(EditCalculationMutation);

  function handleEdit(event) {
    props.setEditData({ visible: false });
    editCalculationMutation({
      variables: {
        _id: props.calculationToEdit._id,
        Number1: +number1Ref.current.inputRef.current.value,
        Number2: +number2Ref.current.inputRef.current.value,
        Sum: +sumRef.current.inputRef.current.value,
        Multiplication: +multiplicationRef.current.inputRef.current.value
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCancel() {
    props.setEditData({ visible: false });
  }

  return (
    <div className={props.className}>
      <h3>number 1:</h3>
      <Input
        ref={number1Ref}
        className={'input'}
        defaultValue={props.calculationToEdit.Number1}
      ></Input>
      <h3>number 2:</h3>
      <Input
        ref={number2Ref}
        className={'input'}
        defaultValue={props.calculationToEdit.Number2}
      ></Input>
      <h3>sum:</h3>
      <Input
        ref={sumRef}
        className={'input'}
        defaultValue={props.calculationToEdit.Sum}
      ></Input>
      <h3>multiplication:</h3>
      <Input
        ref={multiplicationRef}
        className={'input'}
        defaultValue={props.calculationToEdit.Multiplication}
      ></Input>

      <Button primary onClick={handleEdit}>
        Edit
      </Button>
      <Button primary onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}

export default EditCalculation;
