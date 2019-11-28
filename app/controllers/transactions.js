import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({

  accounts: computed(function () {
    const model = this.get('model');
    let accountNames = [];
    model.forEach(item => {
      if (accountNames.indexOf(item.account) < 0){
        accountNames.push(item.account)
      }
    });
    return accountNames
  }),
  categories: computed(function () {
    const model = this.get('model');
    let categoryNames = [];
    model.forEach(item => {
      if (categoryNames.indexOf(item.category) < 0){
        categoryNames.push(item.category)
      }
    });
    return categoryNames
  }),
  subcategories: computed(function () {
    const model = this.get('model');
    let subcategoryNames = [];
    model.forEach(item => {
      if (subcategoryNames.indexOf(item.subcategory) < 0){
        subcategoryNames.push(item.subcategory)
      }
    });
    return subcategoryNames
  }),
  actions: {
    foo() {}
  }

});
