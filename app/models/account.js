import DS from 'ember-data';
const { Model, attr } = DS;

export default class Account extends Model {
  @attr accountName;
  @attr currentValue;
  @attr accountType;
  @attr interestRate;
  @attr currency;
}
