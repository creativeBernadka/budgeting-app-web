import DS from 'ember-data';
const { Model, attr } = DS;

export default class Transaction extends Model {
  @attr account;
  @attr categoryType;
  @attr category;
  @attr subcategory;
  @attr('date') date;
  @attr('number') amount;
}
