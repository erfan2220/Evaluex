//@ts-nocheck
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineCharts = ({ trendData }) => {
    const formattedData = trendData.map(item => {
        const date = new Date(item.created_at);
        return {
            date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
            score: item.score
        };
    });

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart
                data={formattedData}
                margin={{
                    top: 60,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9bc9fb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4064FF33" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#8884d8" fill="url(#colorScore)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LineCharts;
