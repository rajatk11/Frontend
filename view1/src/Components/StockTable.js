import { fetchPerfHistory, fetchTradeinf, fetchStocksummary } from './pullData';
import {useAlgoContext} from "./AlgoContext";
import React, {useEffect, useState, useCallback} from "react";
import Box from '@mui/material/Box';
import {DataGrid} from "@mui/x-data-grid";

const columns = [
  { field: 'datetime', headerName: 'Trade Date and Time', width: 300 },
  { field: 'trade', headerName: 'Trade', width: 150 },
];

function transformData(data) {
  return data.map(item => ({
    id: item.datetime, // Using stock as the unique identifier
    datetime: item.datetime,
    trade: item.trade === 1 ? 'Buy' : item.trade === 0 ? 'No Trade' : item.trade === -1 ? 'Sell' : 'Unknown'

  }));
}

function StockTable({stock}) {

  const [percentageChange, setPercentageChange] = useState([]);
  const [tradehistory, setTradeHistory] = useState([]);
  const [tradestats, setTradeStats] = useState([]);
  const [avgHoldDuration, setAvgHoldDuration] = useState([]);
  const [stockrank, setStockRank] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [rows, setRows] = useState([]);

  const { selectedVariable } = useAlgoContext();

  const formatNumber1dec = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  };

  const fetchData = useCallback(() => {
    fetchPerfHistory(selectedVariable, stock, 'day').then(data => {
      if (data) {
        const dataset = data.map(item => (item.value));
        const per_change = (dataset[dataset.length - 1] - dataset[0]) / dataset[0] * 100;
        setPercentageChange(formatNumber1dec(per_change));
        setTradeHistory([data.stock, data.timestamp, data.trade]);
      }
    });
    fetchStocksummary(selectedVariable).then(data => {
        if (data) {
          const stockData = data.filter(item => item.stock === stock);
          setTradeStats([stockData[0].longs_count, stockData[0].shorts_count]);
          setAvgHoldDuration(stockData[0].avg_hold_period_mins);
          const sortedByPnl = data.sort((a, b) => b.booked_pnl - a.booked_pnl);
          const rank = sortedByPnl.findIndex(item => item.stock === stock) + 1;
          setStockRank(rank);
        }

     }, []);

    fetchTradeinf(selectedVariable).then(data => {
        if (data) {
          const stockData = data.filter(item => item.stock === stock && item.trade !== 0);
          const transformedData = transformData(stockData);
          setRows(transformedData);
        }
    }, []);

    setLastUpdate(new Date());

  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh data every minute
    return () => clearInterval(interval);
  }, [selectedVariable]);

  const logoPath = `/assets/stock_logos/${stock}.png`;

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <div> Stock :   <img src={logoPath} alt={`${stock} logo`} style={{height: 20, marginRight: 8}}/> {stock} </div>
      <div> Total Percentage Gains Since started trading : {percentageChange}</div>
      <div> Total Trades : {tradestats[0]+tradestats[1]} (Longs : {tradestats[0]}, Shorts : {tradestats[1]})</div>
      <div> Average Trade Duration in minutes : {avgHoldDuration}</div>
      <div> Stock Rank : {stockrank}</div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[50]}
        />
      </Box>
    </Box>
  );
}

export default StockTable;