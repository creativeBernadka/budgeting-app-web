import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EnterTransactionComponent extends Component {

  @service store;

  get accounts(){
    const transactions = this.args.transactions;
    let accountNames = [];
    transactions.forEach(item => {
      if (accountNames.indexOf(item.account) < 0){
        accountNames.push(item.account)
      }
    });
    return accountNames
  }

  @tracked selectedAccount = "";

  @action
  chooseAccount(account){
    this.selectedAccount = account;
  }

  get categories(){
    const transactions = this.args.transactions;
    let categoryNames = [];
    transactions.forEach(item => {
      if (categoryNames.indexOf(item.category) < 0){
        categoryNames.push(item.category)
      }
    });
    return categoryNames
  }

  @tracked selectedCategory = "";

  @action
  chooseCategory(category){
    this.selectedCategory = category;
  }

  get subcategories(){
    const transactions = this.args.transactions;
    let subcategoryNames = [];
    transactions.forEach(item => {
      if (subcategoryNames.indexOf(item.subcategory) < 0){
        subcategoryNames.push(item.subcategory)
      }
    });
    return subcategoryNames
  }

  @tracked selectedSubcategory = "";

  @action
  chooseSubcategory(subcategory) {
    this.selectedSubcategory = subcategory;
  }

  @tracked selectedDate = "";
  @tracked selectedAmount = "";
  @tracked anyErrors = 0;

  @action
  chooseDate(date){
    this.selectedDate = date;
  }

  @action
  enterAmount(event){
    this.selectedAmount = event.target.value;
  }

  @action
  addTransaction(){
    if ( this.selectedAccount === "" ||
      this.selectedCategory === "" ||
      this.selectedDate === "" ||
      this.selectedAmount === ""
    ){
      this.anyErrors = 1;
    }
    else {

      this.anyErrors = 0;
      let transaction = this.store.createRecord('transaction', {
        account: this.selectedAccount,
        category: this.selectedCategory,
        subcategory: this.selectedSubcategory,
        date: this.selectedDate,
        amount: this.selectedAmount
      });
      transaction.save();
      this.selectedAccount = "";
      this.selectedCategory = "";
      this.selectedSubcategory = "";
      this.selectedDate = "";
      this.selectedAmount = "";
    }
  }
}
