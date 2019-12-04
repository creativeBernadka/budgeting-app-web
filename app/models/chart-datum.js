import DS from 'ember-data';
const { Model, attr } = DS;

export default class ChartDatumModel extends Model {
  @attr labels;
  @attr datasets;
}
