import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchStocksummary } from './pullData';

const columns = [
  { field: 'stock', headerName: 'Stock', width: 150 },
  { field: 'totalTrades', headerName: 'Total Trades', width: 150, type: 'number' },
  { field: 'totalGain', headerName: 'Total Gain', width: 150, type: 'number' },
  { field: 'avgHoldDuration', headerName: 'Average Hold Duration', width: 200, type: 'number' },
];

export default function Stockuni() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchStocksummary().then(data => {
      const transformedData = data.map(item => ({
        id: item.stock, // Using stock as the unique identifier
        stock: item.stock,
        totalTrades: item.shorts_count + item.longs_count,
        totalGain: item.booked_pnl,
        avgHoldDuration: item.avg_hold_period_mins,
      }));
      setRows(transformedData);
    }).catch(error => console.error('Failed to fetch stock summary:', error));
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}