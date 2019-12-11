import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import {tracked} from "@glimmer/tracking";
import {inject as service} from '@ember/service';

export default class AccountsValueComponent extends Component {

  @service store;

  @tracked checkingAccounts = null;
  @tracked savingsAccounts = null;

  @task (function *() {
    const data = yield this.store.findAll('account');

    this.checkingAccounts = data.filter(account => account.accountType === "checking");
    this.savingsAccounts = data.filter(account => account.accountType === "savings");
  }) getAccountData
}
