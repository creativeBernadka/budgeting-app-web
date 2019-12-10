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

let chartDataId = 1;

function getGeneralData(id){
  let requestedTransactions = transactions;
  let labels = [];
  let dataset = [];

  if (id) {
    const name = accounts
      .filter( account => account.id === id)[0]
      .attributes["account-name"];

    requestedTransactions =
      transactions
        .filter( transaction => {
          if (transaction.attributes.account === name){
            return transaction.attributes
          }
        })
  }

  let incomeTransactions =
    requestedTransactions
      .filter(transaction => {
        if (transaction.attributes["category-type"] === "income"){
          return transaction.attributes
        }
      });

  let expenseTransactions =
    requestedTransactions
      .filter(transaction => {
        if (transaction.attributes["category-type"] === "expense"){
          return transaction.attributes
        }
      });

  if (id) {
    labels = ["income", "expense"];
    const incomeSum =
      incomeTransactions
        .map(transaction => transaction.attributes.amount)
        .reduce((a, b) => a + b, 0);
    const expenseSum =
      expenseTransactions
        .map(transaction => transaction.attributes.amount)
        .reduce((a, b) => a + b, 0);
    dataset = [{
      data: [incomeSum, expenseSum]
    }]
  }
  else {
    labels =
      accounts
        .map(account => account.attributes["account-name"]);

    const incomeData = new Array(labels.length).fill(0);
    const expenseData = new Array(labels.length).fill(0);

    incomeTransactions
      .forEach(transaction => {
        const categoryIndex = labels.indexOf(transaction.attributes.account);
        incomeData[categoryIndex] = incomeData[categoryIndex] + transaction.attributes.amount;
      });
    expenseTransactions
      .forEach(transaction => {
        const categoryIndex = labels.indexOf(transaction.attributes.account);
        expenseData[categoryIndex] = expenseData[categoryIndex] + transaction.attributes.amount;
      });
    dataset = [
      {
        label: "income",
        data: incomeData,
        backgroundColor: '#D6E9C6' // green
      },
      {
        label: "expense",
        data: expenseData,
        backgroundColor: '#FAEBCC' // yellow
      }
    ]
  }
  chartDataId = chartDataId + 1;
  return [{
    type: 'chart-data',
    id: chartDataId,
    attributes: {
      labels: labels,
      datasets: dataset
    }
  }]
}

function getDatasets(transactions) {
  const labels = transactions
    .map(transaction => transaction.attributes.category)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const data = new Array(labels.length).fill(0);

  transactions.forEach(transaction => {
    const categoryIndex = labels.indexOf(transaction.attributes.category);
    data[categoryIndex] = data[categoryIndex] + transaction.attributes.amount;
  });

  return {
    labels,
    chartDatasets: [{
      data
    }]
  }
}

function getStackedDatasets(transactions) {
  const labels = transactions
    .map(transaction => transaction.attributes.category)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const chartDatasets = transactions.reduce((value, current) => {

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
    labels,
    chartDatasets
  }
}

function getData(id, type){
  let labels;
  let chartDatasets;

  if (id) {
    const name = accounts
      .filter( account => account.id === id)[0]
      .attributes["account-name"];
    const requestedTransactions =
      transactions
        .filter( transaction => {
          if (transaction.attributes.account === name){
            return transaction.attributes
          }
        })
        .filter( transaction => {
          if (transaction.attributes["category-type"] === type){
            return transaction
          }
        });
    const results = getStackedDatasets(requestedTransactions);
    labels = results.labels;
    chartDatasets = results.chartDatasets;

  }
  else {
    const requestedTransactions =
      transactions
        .filter( transaction => {
          if (transaction.attributes["category-type"] === type){
            return transaction.attributes
          }
        });
    const results = getDatasets(requestedTransactions);
    labels = results.labels;
    chartDatasets = results.chartDatasets;
  }

  chartDataId = chartDataId + 1;

  return [{
    type: 'chart-data',
    id: chartDataId,
    attributes: {
      labels: labels,
      datasets: chartDatasets
    }
  }]
}

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

    const requestType = JSON.parse(JSON.stringify(request.queryParams)).type;
    let data;

    switch (requestType) {
      case "general":
        data = getGeneralData(JSON.parse(JSON.stringify(request.queryParams)).id);
        break;
      case "expense":
        data = getData(JSON.parse(JSON.stringify(request.queryParams)).id, "expense");
        break;
      case "income":
        data = getData(JSON.parse(JSON.stringify(request.queryParams)).id, "income");
    }

    return {
      data: data
    };
  })
}
