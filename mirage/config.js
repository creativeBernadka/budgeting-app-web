import DS from "ember-data";

const transactions = [
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
  },
  {
    type: 'transactions',
    id: 5,
    attributes: {
      account: "ING",
      category: "food",
      subcategory: "eating out",
      date: "2019-11-24T18:25:43.511Z",
      amount: 26.00
    }
  }
];
const accounts = [
  {
    type: 'accounts',
    id: '1',
    attributes: {
      "account-name": 'ING',
      "current-value": 1000,
      "account-type": 'checking',
      "interest-rate": 0,
      "currency": 'PLN'
    }
  },
  {
    type: 'accounts',
    id: '2',
    attributes: {
      "account-name": 'Cash',
      "current-value": 70,
      "account-type": 'checking',
      "interest-rate": 0,
      "currency": 'PLN'
    }
  },
  {
    type: 'accounts',
    id: '3',
    attributes: {
      "account-name": 'ING - OKO',
      "current-value": 5500,
      "account-type": 'savings',
      "interest-rate": 0.7,
      "currency": 'PLN'
    }
  }
];

const categories = [
  {
    type: 'categories',
    id: 1,
    attributes: {
      "category-name": "food",
      "category-type": "outcome",
      "subcategories": ["home", "eating-out"]
    }
  },
  {
    type: 'categories',
    id: 2,
    attributes: {
      "category-name": "indulgences",
      "category-type": "outcome",
      "subcategories": ["cinema"]
    }
  },
  {
    type: 'categories',
    id: 3,
    attributes: {
      "category-name": "home",
      "category-type": "outcome",
      "subcategories": ["furniture etc", "detergents"]
    }
  },
  {
    type: 'categories',
    id: 4,
    attributes: {
      "category-name": "cosmetics",
      "category-type": "outcome",
      "subcategories": []
    }
  },
  {
    type: 'categories',
    id: 5,
    attributes: {
      "category-name": "presents",
      "category-type": "outcome",
      "subcategories": []
    }
  },
  {
    type: 'categories',
    id: 6,
    attributes: {
      "category-name": "wage",
      "category-type": "income",
      "subcategories": []
    }
  },
  {
    type: 'categories',
    id: 7,
    attributes: {
      "category-name": "return money",
      "category-type": "income",
      "subcategories": []
    }
  }
];

export default function() {
  this.namespace = '/api';

  this.get('/transactions', function (schema, request) {
    let id = JSON.parse(JSON.stringify(request.queryParams)).id;
    if (id) {
      const name = accounts
        .filter( account => account.id === id)[0]
        .attributes["account-name"];
      return {
        data: transactions.filter( transaction => {
          if (transaction.attributes.account === name){
            return transaction
          }
        })
      }
    }
    return {
      data: transactions
    }
  });

  this.post('/transactions', function (schema) {
    return {
      data: []
    }
  });

  this.get('/accounts', function () {
    return {
     data: accounts
    }
  });

  this.get('/accounts/:id', (schema, request) => {
    let id = request.params.id;
    return {
      data: accounts.filter(account => account.id === id)[0]
    }
  });

  this.post('/accounts', function (schema) {
    accounts.push(schema);
  });

  this.get('/categories', function () {
    return {
      data: categories
    }
  });

  this.get('/chart-data', (schema, request) => {
    const id = JSON.parse(JSON.stringify(request.queryParams)).id;
    if (id) {
      const name = accounts
        .filter( account => account.id === id)[0]
        .attributes["account-name"];
      const transactionsForId = transactions.filter( transaction => {
        if (transaction.attributes.account === name){
          return transaction.attributes
        }
      });
      const labels = transactionsForId
        .map(transaction => transaction.attributes.category)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      let values = [];
      transactionsForId.forEach(transaction => {
        const index = labels.indexOf(transaction.attributes.category);
        if (values[index]){
          values[index] = values[index] + transaction.attributes.amount;
        }
        else{
          values[index] = transaction.attributes.amount;
        }
      });
      return {
        data: [{
          type: 'chart-data',
          id: 1,
          attributes: {
            labels: labels,
            datasets: [{
              label: "dataset",
              data: values
            }]
          }
        }]
      }
    }
  })
}
