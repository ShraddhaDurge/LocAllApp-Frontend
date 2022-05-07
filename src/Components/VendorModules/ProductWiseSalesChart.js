import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const productSales=JSON.parse(localStorage.getItem("productSales"))

export default class ProductWiseSalesChart extends PureComponent {

  render() {
    return (
        <BarChart width={440} height={270} data={productSales}
             nameKey="product">
            <XAxis dataKey="product" label={{ value: "Products", position: "insideBottom", dy: 10}} />
            <YAxis dataKey="sales" label={{value: "Total Sales", position: "inside", angle: -90,   dy: -10}} />
             <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />

            <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
    );
  }
}
