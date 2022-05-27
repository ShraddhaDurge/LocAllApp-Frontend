import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const categorySales=JSON.parse(localStorage.getItem("categorySales"))

export default class CategoryWiseSalesChart extends PureComponent {

  render() {
    return (
        <BarChart width={530} height={320} data={categorySales} barSize={60}
             nameKey="category">
            <XAxis dataKey="category"/>
            <YAxis dataKey="sales"  />
            <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="sales" fill="#8884d8"/>
        </BarChart>
    );
  }
}

