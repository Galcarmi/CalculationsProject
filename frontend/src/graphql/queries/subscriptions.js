import { gql } from 'apollo-boost';

export const CalculationsSubscription = gql`
  subscription CalculationsSubscription {
    calculationsSubscription {
      _id
      Number1
      Number2
      Sum
      Multiplication
      type
    }
  }
`;
