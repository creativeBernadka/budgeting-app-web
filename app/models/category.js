import DS from 'ember-data';
const { Model, attr } = DS;

export default class Category extends Model {
  @attr categoryName;
  @attr categoryType;
  @attr subcategories;
}
