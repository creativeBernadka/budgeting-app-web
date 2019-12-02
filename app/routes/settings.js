import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class SettingsRoute extends Route {
  model(){
    return RSVP.hash({
      accounts: this.store.findAll('account'),
      categories: this.store.findAll('category')
    });
  }
}
