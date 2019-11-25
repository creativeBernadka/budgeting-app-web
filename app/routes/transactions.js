import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return [
      {
        account: "ING",
        category: "food",
        subCategory: "eating out",
        date: "2019-11-23T18:25:43.511Z",
        amount: 23.60
      },
      {
        account: "ING",
        category: "indulgences",
        subCategory: "cinema",
        date: "2019-11-20T18:25:43.511Z",
        amount: 25.00
      },
      {
        account: "Cash",
        category: "stationery",
        subCategory: "",
        date: "2019-11-22T18:25:43.511Z",
        amount: 14.56
      },
      {
        account: "ING - OKO",
        category: "money transfer",
        subCategory: "ING",
        date: "2019-11-24T18:25:43.511Z",
        amount: 100.00
      }
    ]
  }
});
