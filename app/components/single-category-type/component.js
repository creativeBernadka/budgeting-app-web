import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import { inject as service } from '@ember/service';

export default class SingleCategoryTypeComponent extends Component {
  @service store;

  @tracked showAddField = false;
  @tracked newCategory = "";

  @action
  showInput(){
    this.showAddField = true;
  }

  @action
  enterNewCategory(category){
    this.newCategory = "";
    this.showAddField = false;
    const newRecord = this.store.createRecord('category', {
      categoryName: category,
      categoryType: this.args.type.toLowerCase(),
      subcategories: []
    });

    newRecord.save()

  }
}
