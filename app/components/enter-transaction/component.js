import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class EnterTransactionComponent extends Component {

  @service store;

  @tracked selectedAccount;
  @tracked selectedDate;
  @tracked selectedCategory;
  @tracked selectedAmount;
  @tracked anyErrors = 0;

  categories = this.args.categories;

  @action
  searchCategory(searchedPhrase){
    const filteredOptions = this.categories.map(category => {
      const filtered = this.getFilteredOptions(category.options, searchedPhrase.toLowerCase());
      const optionsObject = this.createOptionsObject(filtered, category.options);
      if (!isEmpty(optionsObject)){
        return {
          groupName: category.groupName,
          options: optionsObject
        }
      }
      return []
    });
    return filteredOptions
  }

  createOptionsObject(filteredOptions, allOptions){
    return filteredOptions.reduce((total, currentCategory) => {
      const newOptions = [];

      if (currentCategory.isSubcategory){
        const category = allOptions.filter(option => {
          if (option.name === currentCategory.parentCategory){
            return option
          }
        });
        newOptions.push(category[0]);
        newOptions.push(currentCategory);
      }
      else {
        newOptions.push(currentCategory);
        const subcategories = allOptions.filter(option => {
          if (option.parentCategory === currentCategory.name){
            return option
          }
        });
        subcategories.forEach(subcategory => newOptions.push(subcategory));
      }

      newOptions.forEach(option => total.push(option));

      return total
    }, [])
  }

  getFilteredOptions(options, searchedPhrase){
    return options.filter(option => {
      const lowered = option.name.toLowerCase();
      if (lowered.includes(searchedPhrase)){
        return option.name;
      }
    });
  }

  @action
  chooseAccount(account){
    this.selectedAccount = account;
  }

  @action
  chooseCategory(category){
    this.selectedCategory = category;
  }

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
    if (this.isNotFilled()){
      this.anyErrors = 1;
    }
    else {
      this.anyErrors = 0;
      let category;
      let subcategory;

      if (this.selectedCategory.isSubcategory){
        category = this.selectedCategory.parentCategory;
        subcategory = this.selectedCategory.name;
      }
      else {
        category = this.selectedCategory.name;
        subcategory = "";
      }

      let transaction = this.store.createRecord('transaction', {
        account: this.selectedAccount,
        category: category,
        subcategory: subcategory,
        date: this.selectedDate,
        amount: this.selectedAmount
      });

      transaction.save();
      this.clearAll()
    }
  }

  isNotFilled(){
    return isEmpty(this.selectedAccount) ||
      isEmpty(this.selectedCategory) ||
      isEmpty(this.selectedDate) ||
      isEmpty(this.selectedAmount)
  }

  clearAll(){
    this.selectedAccount = "";
    this.selectedCategory = "";
    this.selectedDate = "";
    this.selectedAmount = "";
  }
}
