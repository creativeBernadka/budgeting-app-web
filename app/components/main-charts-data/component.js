import Component from '@glimmer/component';
import {task} from "ember-concurrency";
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {tracked} from "@glimmer/tracking";
import { reads } from '@ember/object/computed';

export default class MainChartsDataComponent extends Component {

  @service store;

  @reads ('chartDataInstance.value')
  chartDataValue;

  @tracked chartDataInstance;

  @action
  getChartData(){
    this.chartDataInstance = this.chartData.perform();
  }

  @task (function *() {
    const pieChart = yield this.store.query('chart-datum',
      {
        type: 'expense'
      });
    const lineChart = yield this.store.query('chart-datum',
      {
        type: 'net-worth'
      });
    return {
      pieChart,
      lineChart
    }
  }) chartData;
}
