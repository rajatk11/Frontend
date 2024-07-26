


export function fetchPortfolio() {
  return fetch('/api/Portfolio/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      return data;
    })
    .catch(error => console.error('Error:', error));
}



export function fetchTradeinf() {
  return fetch('/api/TradeInf/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      return data;
    })
    .catch(error => console.error('Error:', error));
}



export function fetchStocksummary() {
  return fetch('/api/StockSummary/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      return data;
    })
    .catch(error => console.error('Error:', error));
}


// fetchPerfHistory function in `view1/src/components/pullData.js`
// fetchPerfHistory function in `view1/src/components/pullData.js`
export function fetchPerfHistory(stock, duration) {
  return fetch(`/api/PerfHistory?stock=${stock}&duration=${duration}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      return data.reverse() ;
    })
    .catch(error => console.error('Error:', error));
}