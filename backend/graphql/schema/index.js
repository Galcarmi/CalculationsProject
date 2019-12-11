const { gql } = require('apollo-server-express');

module.exports = gql`
  type CalculationItem {
    _id: ID!
    Number1: Float!
    Number2: Float!
    Sum: Float!
    Multiplication: Float!
  }

  type CalculationItemSubscribe {
    _id: ID!
    Number1: Float!
    Number2: Float!
    Sum: Float!
    Multiplication: Float!
    type: String!
  }

  type Subscription {
    calculationsSubscription: CalculationItemSubscribe
  }

  type Query {
    getCalculations: [CalculationItem]!
  }

  type Mutation {
    createCalculation(Number1: Float!, Number2: Float!): CalculationItem!
    deleteCalculation(_id: ID!): String!
    editCalculation(
      _id: ID!
      Number1: Float!
      Number2: Float!
      Sum: Float!
      Multiplication: Float!
    ): String!
  }
`;
