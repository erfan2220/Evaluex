//@ts-nocheck
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LineCharts from "../LineChart/lineChart";
import axios from "axios";
import kpiArchive from "../kpiArchive/kpiArchive.tsx";

const ShowData = ({ kpiArchiveData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState<any[]>([]);
    const [trendData, setTrendData] = useState<any[]>([]);
    const [selectedKpi, setSelectedKpi] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const {selectedName} = location.state || {};




    useEffect(() => {
        if (selectedKpi.kpi_id && selectedName?.province_id) {
            const getTrendData = () => {
                axios.post('http://10.15.90.87:5020/api/kpi_trend/', {
                    kpi_id: selectedKpi.kpi_id,
                    province_id: selectedName.province_id
                })
                    .then(response => {
                        setTrendData(response.data);
                        console.log("API Trend:", response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching trend data:", error);
                    });
            };
            getTrendData();
        }
    }, [selectedKpi, selectedName]);

    useEffect(() => {
        if (selectedName) {
            axios.post('http://10.15.90.87:5020/api/archive_kpis/', {
                event_id: selectedName.event_id
            })
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                    console.log("API response:", response.data);
                })
                .catch(error => {
                    console.error("Error fetching archive KPIs:", error);
                    setLoading(false);
                });
        }
    }, [selectedName]);

    const handleIndex = (index: number) => {
        setCurrentIndex(index);
        setSelectedKpi(data[index]);
        console.log("Selected KPI:", data[index]);
    };
    const Loading = () =>
    {
        return <div>Loading...</div>; // Or use a spinner component
}

    return (
        <div>
            <div className="bg-[#131423] w-full h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">
                <h3 className="text-[20px] opacity-80 text-[#fff]">Evalue X</h3>
                <div className="flex flex-row gap-[23px]">
                    <img src="/images/navbar/not.svg" alt="Gear" width={32} height={32} />
                    <img src="/images/dashboard/user.svg" alt="User" width={32} height={32} />
                </div>
            </div>

            <div className="bg-[#f8f9fb] flex flex-row">
                <div className="menuPartsArchive bg-[#131423] flex flex-col overflow-y-auto pt-[24px] px-[32px] w-[324px] min-h-[calc(100vh-80px)]">
                    {data.map((item, index) => (
                        <div key={index}
                             className={`pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer
                             ${currentIndex === index ? "bg-[#6974D3]" : ""}`}
                             onClick={() => handleIndex(index)}>
                            <img src="/images/Archive/itemIconArchive.svg" alt="Item Icon" />
                            <span className="text-white text-[18px] opacity-80">{item.kpi_name}</span>
                        </div>
                    ))}
                </div>

                <div className="m-[32px]">
                    <h2 className="text-[24px]">{data[currentIndex]?.kpi_name || 'Margin'}</h2>
                    {
                        loading ? <Loading/>:
                            <div className="bg-white rounded-[8px] w-[calc(100vw-400px)] mt-[24px] p-[32px]">
                                <div className="bg-[#F4F4FC] py-[23px] pl-[43px] pr-[61px] flex flex-row items-center w-full justify-between">
                                    <div className="text-center">
                                        <h2 className="text-[18px]">
                                            The score in "{mixedDataName}" is:
                                        </h2>
                                        <p className="text-[20px] text-[#007BFF] mt-[15px]">{trendData.length > 0 ? trendData[trendData.length-1].score : 'ثبت نشده'}</p>
                                    </div>
                                    <img src="/images/Archive/showMessageIcon.svg" alt="Show Message Icon" />
                                </div>

                                {/*  <div className="flex flex-row gap-[28px] mt-[28px]">

                                    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[30%] gap-[35px]">
                                        <h2>Archive</h2>
                                        {trendData.map((item, index) => (
                                            <div className="flex flex-row items-center justify-between" key={index}>
                                                <span className="text-[16px] text-[#757575]">{item.event_name}{item.event_year}</span>
                                                <p className="text-[16px] text-[#424242]">{item.score}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[69%] gap-[35px]">
                                        <h2>Score Changes</h2>
                                        <div>
                                            {trendData.length > 0 ? <LineCharts trendData={trendData} /> : "ثبت نشده"}
                                        </div>
                                    </div>
                                </div>*/}

                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default ShowData;

