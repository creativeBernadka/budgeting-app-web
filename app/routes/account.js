import Route from '@ember/routing/route';
import RSVP from 'rsvp'

export default Route.extend({
  model({account_id}){
    return RSVP.hash({
      accountData: this.store.findRecord('account', account_id),
      history: this.store.query('transaction', {id: account_id}),
      chartData: this.store.query('chart-datum', {id: account_id}),
      chartOptions: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
              // OR //
              beginAtZero: true   // minimum value will be 0.
            }
          }]
        }
      }
    })
  }
});
