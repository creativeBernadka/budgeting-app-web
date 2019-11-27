import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  account: DS.attr(),
  category: DS.attr(),
  subcategory: DS.attr(),
  date: DS.attr('date'),
  amount: DS.attr('number')
});
