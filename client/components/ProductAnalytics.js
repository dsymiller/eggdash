import React, { useState, useContext, useEffect } from 'react';

import { Doughnut, Line } from 'react-chartjs-2';
import UserContext from './UserContext';

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [
        12000,
        19000,
        32000,
        5000,
        22222,
        33422,
        23421,
        132423,
        123432,
        643543,
        543454,
        2323,
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const ProductAnalytics = (props) => {
  const [sales, setSales] = useState(null);
  const [context, setContext] = useContext(UserContext);

  function fetchSales() {
    console.log(context);
    // fetch(`/products/sales/${JSON.stringify(context.farmId)}`)
    fetch(`/products/sales/1`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
        cleanseData;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="productAnalytics">
      {/* <Doughnut data={data} /> */}
      {<Line data={data} />}
    </div>
  );
};

export default ProductAnalytics;
