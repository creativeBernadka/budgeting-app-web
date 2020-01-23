import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {task} from "ember-concurrency";
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import { reads } from '@ember/object/computed';

export default class StatsPageChartsDataComponent extends Component {

  @service store;

  @reads ('chartDataInstance.value')
  chartDataValue;

  @tracked chartDataInstance;

  @action
  getChartData(){
    this.chartDataInstance = this.chartData.perform();
  }

  @task (function *() {
    const generalData = yield this.store.query('chart-datum',
      {
        type: "general"
      });
    const expenseData = yield this.store.query('chart-datum',
      {
        type: "expense"
      });

    return {
      generalData,
      expenseData
    }
  }) chartData
}
