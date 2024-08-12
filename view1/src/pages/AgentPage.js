
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AlgoSelector from "../components/AlgoSelector";
import Container from "@mui/material/Container";
import * as React from "react";
import { useAlgoContext } from '../components/AlgoContext';





const agentDict = {
    'OX1': [
        ["OHLC levels", "For Minute, Hour and Day candles"],
        ["Moving averages", "Calculated over 10-day, 20-day and 100-day periods"],
        ["Volumes - Moving averages", "Calculated over 10-day, 20-day and 100-day periods"],
        ["Index - Moving averages", "Calculated over 10-day, 20-day, 100-day periods"],
        ["Network architecture", "Convolutional + Fully Connected layers"],
        ["Number of layers", "7"],
        ["Number of learned parameters", "2K"],
        ["Loss function", "Cross-entropy"],
        ["Optimizer", "Adam"]
    ],

    'OX2': [
        ["OHLC levels", "NA"],
        ["Moving averages", "NA"],
        ["Volumes - Moving averages", "NA"],
        ["Index - Moving averages", "NA"],
        ["Model specifications", "NA"],
        ["Number of layers", "NA"],
        ["Number of learned parameters", "NA"],
        ["Loss function", "NA"],
        ["Optimizer", "NA"]
    ],
};
function AgentPage() {
  const { selectedVariable } = useAlgoContext();
  const agentData = agentDict[selectedVariable];

  if (!agentData) {
    return (
      <Container>
        <Container maxWidth="lg" sx={{ mt: 1, mb: 3 }}>
            <AlgoSelector />
        </Container>
        <div>Agent data not found</div>
      </Container>
    );
  }
  return (
    <Container>
        <Container maxWidth="lg" sx={{ mt: 1, mb: 3 }}>
            <AlgoSelector />
        </Container>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: '1.5rem', color: 'Purple', fontWeight: 'bold' }}>Feature</TableCell>
                        <TableCell sx={{ fontSize: '1.5rem', color: 'Purple', fontWeight: 'bold' }}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {agentDict[selectedVariable].map((index, row) => (
                    <TableRow key={index}>
                        <TableCell>{index[0]}</TableCell>
                        <TableCell>{index[1]}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}

export default AgentPage;