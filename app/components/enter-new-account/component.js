import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import { inject as service } from '@ember/service';

export default class EnterNewAccountComponent extends Component {

  @service store;

  @tracked accountName = "";

  @action
  enterAccountName(name){
    this.accountName = name;
  }

  @tracked currentValue = "";

  @action
  enterCurrentValue(value){
    this.currentValue = value;
  }

  @tracked currency = "PLN";
  currencies = ["PLN", "GBP", "EUR", "USD"];

  @action
  chooseCurrency(currency){
    this.currency = currency;
  }
  @tracked accountType = "checking";
  @tracked isChecking = "disabled";

  accountTypes = ["checking", "savings"];

  @action
  chooseAccountType(type){
    this.accountType = type;
    this.isChecking = "disabled";
    if(type === "savings"){
      this.isChecking = "";
    }
  }

  @tracked interestRate = "";

  @action
  enterInterestRate(rate){
    this.interestRate = rate;
  }

  @tracked anyErrors = 0;

  @action
  addNewAccount(){
    if (this.accountName === "" ||
      this.currentValue === "" ||
      (this.interestRate === "" && this.isChecking === "")
    ){
      this.anyErrors = 1;
    }
    else {
      this.anyErrors = 0;
      if (this.interestRate === ""){
        this.interestRate = 0;
      }
      let transaction = this.store.createRecord('account', {
        accountName: this.accountName,
        currentValue: this.currentValue,
        accountType: this.accountType,
        interestRate: this.interestRate,
        currency: this.currency
      });
      transaction.save();
      this.accountName = "";
      this.interestRate = "";
      this.currentValue = "";
      this.accountType = "checking";
      this.currency = "PLN";
    }
  }

}
