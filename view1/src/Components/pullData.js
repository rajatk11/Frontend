import {useAlgoContext} from "./AlgoContext";
import {useEffect, useState} from "react";


export function fetchPortfolio(chartLocation) {
  return fetch('/api/' + chartLocation + '/Portfolio/')
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



export function fetchTradeinf(chartLocation) {

  return fetch('/api/' + chartLocation + '/TradeInf/')
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



export function fetchStocksummary(chartLocation) {

    return fetch('/api/' + chartLocation + '/StockSummary/')
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

export async function fetchPerfHistory(chartLocation, stock, duration) {
  const location = `/api/${chartLocation}/PerfHistory/?stock=${stock}&duration=${duration}`;
  try {
    const response = await fetch(location);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    return data.reverse();
  } catch (error) {
    console.error('Error:', error);
  }
}

/*
export function fetchPerfHistory(chartLocation, stock, duration) {
  const location = `/api/${chartLocation}/PerfHistory/?stock=${stock}&duration=${duration}`;
  return fetch(location).then(response => {
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


 */
