import Component from '@glimmer/component';

export default class CategoriesComponent extends Component {

  get incomeCategories(){
    const categories = this.args.categories;
    return categories.filter( category => category.categoryType === "income")
  }

  get outcomeCategories(){
    const categories = this.args.categories;
    return categories.filter( category => category.categoryType === "outcome")
  }
}
