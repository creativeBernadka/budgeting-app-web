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

      let newOption = [];

      if (isEmpty(currentCategory.subcategories)){
        newOption.push({
          name: currentCategory.categoryName,
          isSubcategory: false,
          parentCategory: ""
        });
      }
      else {
        newOption.push({
          name: currentCategory.categoryName,
          isSubcategory: false,
          parentCategory: ""
        });
        currentCategory.subcategories.forEach(subcategory => {
          newOption.push({
            name: subcategory,
            isSubcategory: true,
            parentCategory: currentCategory.categoryName
          })
        });
      }

      if (currentCategory.categoryType === "income"){
        newOption.forEach(option => {
          options[0].options.push(option)
        });
      }
      else {
        newOption.forEach(option => {
          options[1].options.push(option)
        });
      }

      return options

    }, initialOptionsArray);

    return options
  }

}
