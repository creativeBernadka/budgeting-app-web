import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model(){
    return RSVP.hash({
      chartData: this.store.query('chart-datum',
        {
          type: 'expense'
        }),
      chartOptions: {
        legend: {
          position: 'left'
        }
      }
    })
  }
});
