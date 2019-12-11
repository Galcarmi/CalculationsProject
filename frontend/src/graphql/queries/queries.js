import { gql } from 'apollo-boost';
const query = gql`
  {
    getCalculations {
      Number1
      Number2
      Sum
      Multiplication
      _id
    }
  }
`;

export default query;
