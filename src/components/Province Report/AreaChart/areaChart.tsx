//@ts-nocheck

import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, defs } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const MyAreaChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart
                data={data}
                margin={{
                    top: 58,
                    right: 40,
                    left: 30,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="4">
                        <stop offset="10%" stopColor="#74A6F657" stopOpacity={0.8}/>
                        <stop offset="34%" stopColor="#74A6F657" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="linear"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="url(#colorUv)"
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}

export default MyAreaChart;
