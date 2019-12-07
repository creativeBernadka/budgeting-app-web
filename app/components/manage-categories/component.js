import Component from '@glimmer/component';

export default class ManageCategoriesComponent extends Component {
  get incomeCategories(){
    const categories = this.args.categories;
    return categories.filter( category => category.categoryType === "income")
  }

  get outcomeCategories(){
    const categories = this.args.categories;
    return categories.filter( category => category.categoryType === "expense")
  }
}
