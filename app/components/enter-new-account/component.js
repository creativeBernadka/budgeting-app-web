import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class EnterNewAccountComponent extends Component {

  @service store;

  @tracked accountName;
  @tracked currentValue;
  @tracked currency = "PLN";
  @tracked accountType = "checking";
  @tracked isChecking = "disabled";
  @tracked interestRate = "";
  @tracked anyErrors = 0;
  currencies = ["PLN", "GBP", "EUR", "USD"];
  accountTypes = ["checking", "savings"];

  @action
  enterAccountName(name){
    this.accountName = name;
  }

  @action
  enterCurrentValue(value){
    this.currentValue = value;
  }

  @action
  chooseCurrency(currency){
    this.currency = currency;
  }

  @action
  chooseAccountType(type){
    this.accountType = type;
    this.isChecking = "disabled";
    if(type === "savings"){
      this.isChecking = "";
    }
  }

  @action
  enterInterestRate(rate){
    this.interestRate = rate;
  }

  @action
  addNewAccount(){
    if (this.isNotFilled()){
      this.anyErrors = 1;
    }
    else {
      this.anyErrors = 0;
      if (this.interestRate === ""){
        this.interestRate = 0;
      }
      let newRecord = this.store.createRecord('account', {
        accountName: this.accountName,
        currentValue: this.currentValue,
        accountType: this.accountType,
        interestRate: this.interestRate,
        currency: this.currency
      });
      newRecord.save();
      this.clearAll()
    }
  }

  isNotFilled(){
    return isEmpty(this.accountName) ||
      isEmpty(this.currentValue) ||
      (isEmpty(this.interestRate) && isEmpty(this.isChecking))
  }

  clearAll(){
    this.accountName = "";
    this.interestRate = "";
    this.currentValue = "";
    this.accountType = "checking";
    this.currency = "PLN";
  }
}
