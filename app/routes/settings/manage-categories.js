import Route from '@ember/routing/route';

export default class SettingsManageCategoriesRoute extends Route {
  model(){
    return this.store.findAll('category');
  }
}
