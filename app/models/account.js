import DS from 'ember-data';
const { Model } = DS;

export default Model.extend ({
  accountName: DS.attr(),
  currentValue: DS.attr(),
  accountType: DS.attr(),
  interestRate: DS.attr(),
  currency: DS.attr()
})
