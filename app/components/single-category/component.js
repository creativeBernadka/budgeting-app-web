import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class SingleCategoryComponent extends Component {
  @service store;

  @tracked showAddField = false;
  @tracked newSubcategory = "";

  @action
  showInput(){
    this.showAddField = true;
  }

  @action
  enterNewSubcategory(subcategory){
    this.newSubcategory = "";
    this.showAddField = false;
    this.store
      .queryRecord('category', {categoryName: this.args.category.categoryName})
      .then( function (category) {
        category.subcategories.push(subcategory)
      });
  }
}
