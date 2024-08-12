{/*

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {useFetchPortfolio} from "./pullData";


function transformData(apiResponse) {
  return apiResponse.map((item, index) => {
    return {
      id: index,
      value: Math.abs(item.posn_val),
      label: item.stock
    };
  });
}


export default function Pichart() {
  const [dataVals, setDataVals] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    useFetchPortfolio().then(data => {
      const transformedData = transformData(data);
      setDataVals(transformedData);
      console.log(dataVals);
    });
  }, []);
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 25,
                    data: dataVals,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -180,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,

                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'skyblue',
                    fontSize: 10,
                    fontWeight: 'bold',
                },
            }}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                    labelStyle: {
                        fontSize: 10,
                        fill: 'darkmagenta'
                    },
                },
            }}
            height={300}
        />
    );

}

*/}