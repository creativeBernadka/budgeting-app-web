import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model(){
    return RSVP.hash({
      pieChartData: this.store.query('chart-datum',
        {
          type: 'expense'
        }),
      pieChartOptions: {
        legend: {
          position: 'left'
        }
      },
      lineChartData: this.store.query('chart-datum',
        {
          type: 'net-worth'
        }),
      lineChartOptions: {
        legend: {
          position: 'left'
        }
      }
    })
  }
});
