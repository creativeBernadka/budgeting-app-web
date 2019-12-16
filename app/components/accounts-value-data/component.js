import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {task} from "ember-concurrency";
import {inject as service} from '@ember/service';
import {action} from '@ember/object';

export default class AccountsValueDataComponent extends Component {

  @service store;

  @tracked accountDataInstance;

  @action
  getAccountData(){
    this.accountDataInstance = this.accountData.perform();
  }

  @task (function *() {
    const data = yield this.store.findAll('account');

    return {
      checkingAccounts: data.filter(account => account.accountType === "checking"),
      savingsAccounts: data.filter(account => account.accountType === "savings")
    }
  }) accountData
}