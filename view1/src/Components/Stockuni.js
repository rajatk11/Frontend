
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchStocksummary } from './pullData';
import Typography from "@mui/material/Typography";
import { useAlgoContext } from "./AlgoContext";
import { Link, useParams } from 'react-router-dom';

//<a href={`./stocks/${stock}`} style={{textDecoration: 'none', color: 'inherit'}}>
        //  {stock}
        //</a>
const handleStockClick = (event, stock) => {
  event.preventDefault();
  // Navigate to the stock page
  window.location.href = `/stocks/${stock}`;
};

const renderStockCell = (agent, stock) => {
  const logoPath = `/assets/stock_logos/${stock}.png`;

  return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={logoPath} alt={`${stock} logo`} style={{width: 20, height: 20, marginRight: 8}}/>
        <Link to={`/${agent}/${stock}`} style={{ textDecoration: 'none', color: 'darkseagreen', fontWeight: 'bold', fontSize: '16px' }}>
          {stock}
        </Link>

      </div>
  );
};

const columns = (agent) => [
  {
    field: 'stock',
    headerName: 'Stock',
    width: 150,
    renderCell: (params) => renderStockCell(agent, params.value),
  },
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
  const { selectedVariable } = useAlgoContext();

  const fetchData = useCallback(() => {
    fetchStocksummary(selectedVariable).then(data => {
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
  }, [selectedVariable]);


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns(selectedVariable)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
        <Typography variant="caption" display="block" gutterBottom>
          Last updated: {lastUpdate.toLocaleString()}
        </Typography>
    </Box>
  );
}
