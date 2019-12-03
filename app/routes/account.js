import Route from '@ember/routing/route';
import RSVP from 'rsvp'

export default Route.extend({
  model({account_id}){
    return RSVP.hash({
      accountData: this.store.findRecord('account', account_id),
      history: this.store.query('transaction', {id: account_id})
    })
  }
});
