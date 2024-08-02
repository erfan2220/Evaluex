import  { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

const DataTable = () =>
{

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const filterPopupRef = useRef(null);

    const location = useLocation();
    const { data2, dataArchive } = location.state || {};

    const separateDataArchive = useCallback(() => {
        if (data2 && Array.isArray(data2)) {
            return data2.filter(item => item.archived === true);
        }
        return [];
    }, [data2]);

    const separateDataArchiveGroup = useCallback(() => {
        if (dataArchive && Array.isArray(dataArchive)) {
            return dataArchive.map(item => item.group);
        }
        return [];
    }, [dataArchive]);

    useEffect(() => {
        const fetchData = async () => {
            const filteredData = separateDataArchive();
            const filteredDataGroup = separateDataArchiveGroup();

            if (filteredData.length > 0) {
                try {
                    const response = await axios.post("http://10.15.90.87:5020/api/archive_table/", {
                        "event_id": filteredData[0].id,
                        "province_names": filteredDataGroup
                    });
                    console.log("Post response:", filteredDataGroup);
                    setData(response.data);
                    if (response.data.length > 0) {
                        setColumns(Object.keys(response.data[0]));
                    }
                } catch (error) {
                    console.error("There was an error posting the data!", error);
                }
            }
        };
        fetchData();
    }, [data2, separateDataArchive, separateDataArchiveGroup]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (column, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [column]: value
        }));
    };

    const getUniqueValues = (column) => {
        const values = data.map(item => item[column]);
        return [...new Set(values)];
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearchTerm = Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesFilters = Object.entries(filters).every(([column, value]) => {
                if (value === '') return true;
                return item[column] === value;
            });
            return matchesSearchTerm && matchesFilters;
        });
    }, [data, searchTerm, filters]);

    const exportData = () => {
        const csvData = [
            columns,
            ...data.map(item => columns.map(col => item[col]))
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleClickOutside = (event) => {
        if (filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
            setShowFilterPopup(false);
        }
    };

    useEffect(() => {
        if (showFilterPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterPopup]);

    const filterableColumns = ['PROVINCE_NAME', 'KPI_NAME', 'VENDOR', 'RFSYSTEMS'];

    return (
        <div className="p-4">
            <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">bahar 1401</span>
                    <h3 className="text-xl font-bold text-gray-800">Tehran</h3>
                </div>

                <div className="flex flex-row items-center space-x-4">
                    <div className="flex items-center w-[360px] bg-white border border-[#E0E0E0] p-[12px] rounded-md">
                        <img src="/images/active/search.svg" alt="Search" className="mr-2"/>
                        <input
                            className="outline-none border-none bg-transparent"
                            placeholder="Search here"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <button onClick={exportData} className="flex items-center px-4 py-2 bg-[#3E4DCE] text-white rounded-md gap-[8px]">
                        <img src="/images/Archive/Export.svg" alt="Export" />
                        Export
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                {col}
                                {filterableColumns.includes(col.toUpperCase()) && (
                                    <select
                                        value={filters[col] || ''}
                                        onChange={e => handleFilterChange(col, e.target.value)}
                                        className="mt-1 block w-full p-2 border rounded">
                                        <option value="">All</option>
                                        {getUniqueValues(col).map((value, valIdx) => (
                                            <option key={valIdx} value={value}>{value}</option>
                                        ))}
                                    </select>
                                )}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-6 py-4 border-b border-gray-200">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
