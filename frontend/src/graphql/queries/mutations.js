import { gql } from 'apollo-boost';

export const CreateCalculationMutation = gql`
  mutation CreateCalculation($Number1: Float!, $Number2: Float!) {
    createCalculation(Number1: $Number1, Number2: $Number2) {
      Number1
      Number2
      Sum
      Multiplication
    }
  }
`;

export const DeleteCalculationMutation = gql`
  mutation DeleteCalculation($_id: ID!) {
    deleteCalculation(_id: $_id)
  }
`;

export const EditCalculationMutation = gql`
  mutation EditCalculation(
    $_id: ID!
    $Number1: Float!
    $Number2: Float!
    $Sum: Float!
    $Multiplication: Float!
  ) {
    editCalculation(
      _id: $_id
      Number1: $Number1
      Number2: $Number2
      Sum: $Sum
      Multiplication: $Multiplication
    )
  }
`;
