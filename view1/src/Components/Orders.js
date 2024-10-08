import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useState, useEffect, useCallback} from 'react';
import {fetchPortfolio} from "./pullData";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAlgoContext } from "./AlgoContext";
// Generate Order Data
function createData(stock, posn, daysgain, posn_size) {
  const formatNumberint = (number) => {
    const rounded = Math.round(number);
    return new Intl.NumberFormat('en-US').format(rounded);
  };

  const formatNumber1dec = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  };

  return {
    stock,
    posn,
    daysgain: formatNumber1dec(Number(daysgain)),
    posn_size: formatNumberint(Number(posn_size.replace(/[^0-9.-]+/g,""))) // remove non-numeric characters and convert to number
  };
}


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const { selectedVariable } = useAlgoContext();

  const fetchData = useCallback(() => {

    fetchPortfolio(selectedVariable).then(data => {
      if (data) {
        const newRows = data.map(item => createData(item.stock, item.posn_norm, item.days_gain_val, item.posn_val));
        setRows(newRows);
      }

    });
    setLastUpdate(new Date());
  });
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh data every minute
    return () => clearInterval(interval);
  }, [selectedVariable]);

  return (
    <React.Fragment>
      <Title>Current Portfolio</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align={"right"}>Day's Gain</TableCell>
            <TableCell align="right">Position Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.stock}>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.posn}</TableCell>
              <TableCell align={"right"}>${row.daysgain}</TableCell>
              <TableCell align="right">${row.posn_size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="caption" display="block" gutterBottom>
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
      </Box>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Full Portfolio
      </Link>
    </React.Fragment>
  );
}
