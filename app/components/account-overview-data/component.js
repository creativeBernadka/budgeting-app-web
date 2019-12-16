import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {task} from "ember-concurrency";
import {inject as service} from '@ember/service';
import {action} from '@ember/object';

export default class AccountOverviewDataComponent extends Component {

  @service store;

  get accountId (){
    return this.args.accountId;
  }

  @tracked dataInstance;

  @action
  getData(){
    this.dataInstance = this.data.perform();
  }

  @task (function *() {
    const account = yield this.store.findRecord('account', this.accountId);
    const chartData = yield this.store.query('chart-datum',
      {
        type: "expense",
        id: this.accountId,
        stacked: true
      });

    return {
      account,
      chartData
    }
  }) data;
}
