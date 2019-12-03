import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stats');
  this.route('account');
  this.route('main');
  this.route('transactions');
  this.route('settings', function() {
    this.route('manage-accounts');
  });
});

export default Router;
