import DS from 'ember-data';
const { Model } = DS;

export default Model.extend( {
  categoryName: DS.attr(),
  categoryType: DS.attr(),
  subcategories: DS.hasMany('string')
})
