import Route from '@ember/routing/route';

export default class SettingsRoute extends Route {
  redirect(){
    this.transitionTo('settings.manage-accounts');
  }
}
