function getRandColor(brightness){
  // Six levels of brightness from 0 to 5, 0 being the darkest
  const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  const mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
  const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
  return "rgb(" + mixedrgb.join(",") + ")";
}

const transactions = [
  {
    type: 'transactions',
    id: 1,
    attributes: {
      account: "ING",
      "category-type": "expense",
      category: "food",
      subcategory: "home",
      date: "2019-11-23T18:25:43.511Z",
      amount: 23.60
    }
  },
  {
    type: 'transactions',
    id: 2,
    attributes: {
      account: "ING",
      "category-type": "expense",
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
      "category-type": "expense",
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
      "category-type": "expense",
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
      "category-type": "expense",
      category: "food",
      subcategory: "eating out",
      date: "2019-11-24T18:25:43.511Z",
      amount: 26.00
    }
  },
  {
    type: 'transactions',
    id: 6,
    attributes: {
      account: "ING",
      "category-type": "income",
      category: "wage",
      subcategory: "",
      date: "2019-12-24T18:25:43.511Z",
      amount: 260
    }
  },
  {
    type: 'transactions',
    id: 7,
    attributes: {
      account: "Cash",
      "category-type": "income",
      category: "return money",
      subcategory: "",
      date: "2019-12-2T18:25:43.511Z",
      amount: 100
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
      "category-type": "expense",
      "subcategories": ["home", "eating-out"]
    }
  },
  {
    type: 'categories',
    id: 2,
    attributes: {
      "category-name": "indulgences",
      "category-type": "expense",
      "subcategories": ["cinema"]
    }
  },
  {
    type: 'categories',
    id: 3,
    attributes: {
      "category-name": "home",
      "category-type": "expense",
      "subcategories": ["furniture etc", "detergents"]
    }
  },
  {
    type: 'categories',
    id: 4,
    attributes: {
      "category-name": "cosmetics",
      "category-type": "expense",
      "subcategories": []
    }
  },
  {
    type: 'categories',
    id: 5,
    attributes: {
      "category-name": "presents",
      "category-type": "expense",
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

  this.get('/categories',  (schema, request) => {
    const categoryName = JSON.parse(JSON.stringify(request.queryParams)).categoryName;
    if (categoryName) {
      const singleCategory = categories.filter( category => {
        if (category.attributes["category-name"] === categoryName){
          return category
        }
      })[0];
      return {
        data: singleCategory
      }
    }
    return {
      data: categories
    }
  });

  this.post('/categories', function () {
    return{
      data: []
    }
  });

  this.get('/chart-data', (schema, request) => {
    const id = JSON.parse(JSON.stringify(request.queryParams)).id;
    if (id) {
      const name = accounts
        .filter( account => account.id === id)[0]
        .attributes["account-name"];
      const requestedTransactions = transactions.filter( transaction => {
        if (transaction.attributes.account === name){
          return transaction.attributes
        }
      });
      const labels = requestedTransactions
        .map(transaction => transaction.attributes.category)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      const chartDatasets = requestedTransactions.reduce((value, current) =>{

        const categoryIndex = labels.indexOf(current.attributes.category);

        const labelAlreadyExists =
          value.filter( object => {
            if (object.label === current.attributes.subcategory){
              return object
            }
          });

        if (labelAlreadyExists.length > 0) {
          const currentValue = labelAlreadyExists[0].data[categoryIndex];
          labelAlreadyExists[0].data[categoryIndex] =
            currentValue + current.attributes.amount;
        }
        else {
          const data = new Array(labels.length).fill(0);

          data[categoryIndex] = current.attributes.amount;

          const newValue = {
            label: current.attributes.subcategory,
            data: data,
            backgroundColor: getRandColor(5)
          };

          value.push(newValue);
        }

        return value
      }, []);

      return {
        data: [{
          type: 'chart-data',
          id: 1,
          attributes: {
            labels: labels,
            datasets: chartDatasets
          }
        }]
      }
    }
  })
}
