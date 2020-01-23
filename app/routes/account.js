import Route from '@ember/routing/route';

export default Route.extend({
  model({account_id}){
    return account_id
  }
});
