import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import {task} from "ember-concurrency";

export default class TransactionHistoryDataComponent extends Component {

  @service store;

  get accountId() {
    return this.args.accountId;
  }

  @tracked transactionsInstance;

  @action
  getTransactions(){
    this.transactionsInstance = this.transactions.perform();
  }

  @task (function *() {
    return yield this.store.query('transaction', {id: this.accountId})
    }
  ) transactions;
}
