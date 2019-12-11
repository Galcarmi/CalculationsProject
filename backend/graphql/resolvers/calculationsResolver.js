const { PubSub } = require('apollo-server-express');
const Calculation = require('../../models/CalculationItem');

const pubsub = new PubSub();
const Listener_Key = 'YouWillListenToMe!';

module.exports = {
  Subscription: {
    calculationsSubscription: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([Listener_Key])
    }
  },
  Query: {
    getCalculations: () => {
      return Calculation.find()
        .then(results => {
          return results.map(result => {
            return { ...result._doc };
          });
        })
        .catch(err => {
          throw err;
        });
    }
  },

  Mutation: {
    createCalculation: (parent, numbers) => {
      const num1 = numbers.Number1;
      const num2 = numbers.Number2;
      const sum = num1 + num2;
      const multiplication = num1 * num2;

      const item = new Calculation({
        Number1: +num1,
        Number2: +num2,
        Sum: +sum,
        Multiplication: +multiplication
      });

      return item
        .save()
        .then(res => {
          pubsub.publish(Listener_Key, {
            calculationsSubscription: { ...res._doc, type: 'new' }
          });

          return res._doc;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteCalculation: (parent, data) => {
      return Calculation.findByIdAndRemove(data._id)
        .then(res => {
          pubsub.publish(Listener_Key, {
            calculationsSubscription: { ...res._doc, type: 'delete' }
          });
          return 'deleted';
        })
        .catch(err => {
          throw err;
        });
    },
    editCalculation: (parent, data) => {
      return Calculation.findByIdAndUpdate(data._id, {
        Number1: data.Number1,
        Number2: data.Number2,
        Sum: data.Sum,
        Multiplication: data.Multiplication
      })
        .then(res => {
          pubsub.publish(Listener_Key, {
            calculationsSubscription: { ...data, type: 'edit' }
          });
          return 'updated';
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
