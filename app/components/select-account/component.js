import Component from '@glimmer/component';
import { task } from "ember-concurrency";
import {inject as service} from '@ember/service';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class SelectAccountComponent extends Component {

  @service store;
  @service router;

  @tracked accounts = null;
  @tracked selected = null;

  @action
  selectAccount(account){
    this.selected = account;
    this.router.transitionTo('account',account.id)
  }

  @task (function * () {
    const data = yield this.store.findAll('account');

    this.accounts = data;
    this.selected = data[0];
  }) getAccounts;
}
