import Component from '@glimmer/component';
import {task} from "ember-concurrency";
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import { reads } from '@ember/object/computed';

export default class SingleAccountStatsDataComponent extends Component {

  @service store;

  @reads ('chartDataInstance.value')
  chartDataValue;

  @tracked chartDataInstance;

  @action
  getChartData(){
    this.chartDataInstance = this.chartData.perform();
  }

  @task (function *() {
    const barChartData = yield this.store.query('chart-datum',
      {
        type: "general",
        id: this.args.accountId
      });
    const pieChartData = yield this.store.query('chart-datum',
      {
        type: "expense",
        id: this.args.accountId
      });

    return{
      barChartData,
      pieChartData
    }
  }) chartData;
}
