import React from "react";
class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    };
  }

  componentDidMount() {
    this.fetchStock();
  }
  fetchStock() {
    const pointerTothis = this;
    // console.log(pointerTothis);
    const API_KEY = "MB95N3SATNNHOD1Y.";
    let stockTicker = "AMZN";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTicker}&interval=5min&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then(function(responce) {
        return responce.json();
      })
      .then(function(data) {
        // console.log(data);
        for (var key in data["Time Series (5min)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (5min)"][key]["1. open"]
          );
        // console.log(stockChartYValuesFunction)

        pointerTothis.setState({
            stockChartXValues:stockChartXValuesFunction,
            stockChartYValues:stockChartYValuesFunction
        })
        }
      });
  }
  render() {
    return (
      <div>
        <h1>Stock</h1>
        <p>x-values:{this.state.stockChartXValues}</p>
        <p>y-values:{this.state.stockChartYValues}</p>
      </div>
    );
  }
}
export default Stock;
