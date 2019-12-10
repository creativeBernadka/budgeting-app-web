import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      generalData: this.store.query('chart-datum',
        {
          type: "general"
        }),
      expenseData: this.store.query('chart-datum',
        {
          type: "expense"
        }),
      accounts: this.store.findAll('account'),
      barChartOptions: {
        legend: {
          position: 'right'
        }
      },
      pieChartOptions: {
        legend: {
          position: 'left'
        }
      }
    })
  }
});
