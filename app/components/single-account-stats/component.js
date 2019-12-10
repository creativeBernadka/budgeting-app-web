import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {task} from "ember-concurrency";
import {tracked} from "@glimmer/tracking";

export default class SingleAccountStatsComponent extends Component {

  @service store;

  @tracked barChartData = null;
  @tracked pieChartData = null;

  barChartOptions = {
    legend: {
      display: false
    }
  };

  pieChartOptions = {
    legend: {
      position: 'left'
    }
  };

  @task(function * () {
    let chartData = yield this.store.query('chart-datum',
      {
        type: "general",
        id: this.args.accountId
      });

    this.barChartData = chartData;

  }) getBarChartDataTask

  @task(function * () {
    let chartData = yield this.store.query('chart-datum',
      {
        type: "expense",
        id: this.args.accountId
      });

    this.pieChartData = chartData;

  }) getPieChartDataTask;
}
