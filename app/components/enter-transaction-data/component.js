import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {tracked} from "@glimmer/tracking";
import {task} from "ember-concurrency";
import { isEmpty } from '@ember/utils';

export default class EnterTransactionDataComponent extends Component {

  @service store;

  @tracked dataInstance;

  @action
  getData(){
    this.dataInstance = this.data.perform();
  }

  @task (function *() {
    const accounts = yield this.store.findAll('account');
    const categories = yield this.store.findAll('category');

    return {
      accountNames: accounts.map(account => account.accountName),
      categories: this.createOptionsArray(categories)
    }
  }) data;

  createOptionsArray(categories){
    const initialOptionsArray = [
      {
        groupName: "INCOME",
        options: []
      },
      {
        groupName: "EXPENSE",
        options: []
      }
    ];

    const options = categories.reduce((options, currentCategory) => {

      let newOption;

      if (isEmpty(currentCategory.subcategories)){
        newOption = currentCategory.categoryName;
      }
      else {
        newOption = {
          groupName: currentCategory.categoryName,
          options: currentCategory.subcategories
        };
      }

      if (currentCategory.categoryType === "income"){
        options[0].options.push(newOption)
      }
      else {
        options[1].options.push(newOption)
      }

      return options

    }, initialOptionsArray);

    return options
  }

}
