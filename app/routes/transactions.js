import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.store.findAll('transaction');
  },
  setupController(controller, model) {
    controller.set('model', model);
  }
});
