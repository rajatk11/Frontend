import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react';
import {fetchPortfolio} from "./pullData";
// Generate Order Data
function createData(stock, posn, daysgain, posn_size) {
  return {
    stock,
    posn,
    daysgain: Number(daysgain),
    posn_size: Number(posn_size.replace(/[^0-9.-]+/g,"")) // remove non-numeric characters and convert to number
  };
}


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = useState([]);

  useEffect(() => {

    fetchPortfolio().then(data => {
      if (data) {
        const newRows = data.map(item => createData(item.stock, item.posn_norm, item.days_gain_val, item.posn_val));
        setRows(newRows);
      }
    });
  }, []);
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
              <TableCell align={"right"}>{row.daysgain}</TableCell>
              <TableCell align="right">{row.posn_size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Full Portfolio
      </Link>
    </React.Fragment>
  );
}
