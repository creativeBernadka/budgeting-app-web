import Route from '@ember/routing/route';

export default class SettingsManageAccountsRoute extends Route {
  model() {
    return this.store.findAll('account')
  }
}
