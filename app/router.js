import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stats');
  this.route('account', {path: '/account/:account_id'});
  this.route('main');
  this.route('transactions');
  this.route('settings', function() {
    this.route('manage-accounts');
    this.route('manage-categories');
  });
});

export default Router;
