import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';

const StatisticsBox = ({ month }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const loadStatistics = async () => {
            const { data } = await fetchStatistics(month);
            setStatistics(data);
        };
        loadStatistics();
    }, [month]);

    return (
        <div>
            <h3>Statistics</h3>
            <p>Total Sale Amount: ${statistics.totalSale}</p>
            <p>Sold Items: {statistics.soldCount}</p>
            <p>Unsold Items: {statistics.unsoldCount}</p>
        </div>
    );
};

export default StatisticsBox;
