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
  selectedAccount: "",
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
  selectedCategory: "",
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
  selectedSubcategory: "",
  selectedDate: "",
  selectedAmount: "",
  anyErrors: 0,
  actions: {
    chooseAccount(account){
      this.set('selectedAccount', account)
    },
    chooseCategory(category){
      this.set('selectedCategory', category)
    },
    chooseSubcategory(subcategory){
      this.set('selectedSubcategory', subcategory)
    },
    chooseDate(date){
      this.set('selectedDate', date)
    },
    enterAmount(event){
      this.set("selectedAmount", event.target.value);
    },
    addTransaction(){
      if(this.get("selectedAccount").length === 0 ||
        this.get("selectedCategory").length === 0 ||
        this.get("selectedDate").length === 0 ||
        this.get("selectedAmount").length === 0
      ){
        this.set("anyErrors", 1)
      }
      else {

        this.set("anyErrors", 0);
        let transaction = this.store.createRecord('transaction', {
          account: this.get("selectedAccount"),
          category: this.get("selectedCategory"),
          subcategory: this.get("selectedSubcategory"),
          date: this.get("selectedDate"),
          amount: this.get("selectedAmount")
        });
        transaction.save();
        this.set("selectedAccount", "");
        this.set("selectedCategory", "");
        this.set("selectedSubcategory", "");
        this.set("selectedDate", "");
        this.set("selectedAmount", "");
      }
    }
  }
});
