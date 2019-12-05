import Route from '@ember/routing/route';
import RSVP from 'rsvp'

export default Route.extend({
  model({account_id}){
    return RSVP.hash({
      accountData: this.store.findRecord('account', account_id),
      history: this.store.query('transaction', {id: account_id}),
      chartData: this.store.query('chart-datum', {id: account_id}),
      chartOptions: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            display: true,
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
});
