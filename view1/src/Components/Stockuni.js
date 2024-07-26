import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchStocksummary } from './pullData';
import Typography from "@mui/material/Typography";

const columns = [
  { field: 'stock', headerName: 'Stock', width: 150 },
  { field: 'totalTrades', headerName: 'Total Trades', width: 150, type: 'number' },
  { field: 'totalGain', headerName: 'Total Gain', width: 150, type: 'number' },
  { field: 'avgHoldDuration', headerName: 'Average Hold Duration', width: 200, type: 'number' },
];

function transformData(data) {
  return data.map(item => ({
    id: item.stock, // Using stock as the unique identifier
    stock: item.stock,
    totalTrades: item.shorts_count + item.longs_count,
    totalGain: item.booked_pnl,
    avgHoldDuration: item.avg_hold_period_mins,
  }));
}

export default function Stockuni() {
  const [rows, setRows] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = useCallback(() => {
    fetchStocksummary().then(data => {
      if (data) {
        const transformedData = transformData(data);
        setRows(transformedData);
      }
      setLastUpdate(new Date());
    }, []);
  });


  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh data every minute
    return () => clearInterval(interval);
  }, []);


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
        <Typography variant="caption" display="block" gutterBottom>
          Last updated: {lastUpdate.toLocaleString()}
        </Typography>
    </Box>
  );
}