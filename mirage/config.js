const data = [
  {
    type: 'transactions',
    id: 1,
    attributes: {
      account: "ING",
      category: "food",
      subcategory: "eating out",
      date: "2019-11-23T18:25:43.511Z",
      amount: 23.60
    }
  },
  {
    type: 'transactions',
    id: 2,
    attributes: {
      account: "ING",
      category: "indulgences",
      subcategory: "cinema",
      date: "2019-11-20T18:25:43.511Z",
      amount: 25.00
    }
  },
  {
    type: 'transactions',
    id: 3,
    attributes: {
      account: "Cash",
      category: "stationery",
      subcategory: "",
      date: "2019-11-22T18:25:43.511Z",
      amount: 14.56
    }
  },
  {
    type: 'transactions',
    id: 4,
    attributes: {
      account: "ING - OKO",
      category: "money transfer",
      subcategory: "ING",
      date: "2019-11-24T18:25:43.511Z",
      amount: 100.00
    }
  }
];
export default function() {
  this.namespace = '/api';

  this.get('/transactions', function () {
    return {
      data: data
    }
  });

  this.post('/transactions', function (schema) {
    data.push(schema)
  })
}
