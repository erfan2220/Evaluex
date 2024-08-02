//@ts-nocheck
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AreaChart from "../AreaChart/areaChart.tsx";

const ShowDataArchive = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState<any[]>([]);
    const [trendData, setTrendData] = useState<any[]>([]);
    const [selectedKpi, setSelectedKpi] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const {selectedName, kpiArchiveData} = location.state || {};

    console.log("selected",selectedName)
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
        if (selectedName && kpiArchiveData) {
            const eventIds = kpiArchiveData
                .filter(item => item.archived === true)
                .map(item => item.id)
                .join(',');

            axios.post('http://10.15.90.87:5020/api/archive_kpis/', {
                event_id: eventIds
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
            <div className="bg-[#1F202C] w-full h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">
                <h3 className="text-[20px] opacity-80 text-[#fff]">Evalue X</h3>
                <div className="flex flex-row gap-[23px]">
                    <img src="/images/navbar/not.svg" alt="Gear" width={32} height={32} />
                    <img src="/images/dashboard/user.svg" alt="User" width={32} height={32} />
                </div>
            </div>

            <div className="bg-[#1F202C] flex flex-row">
                <div className="menuPartsArchive bg-[#1F202C] flex flex-col overflow-y-auto pt-[24px] px-[32px] w-[324px] min-h-[calc(100vh-80px)]">
                    {
                        data.map((item, index) => (
                        <div key={index} className={`pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer overflow-ellipsis
                             ${currentIndex === index ? "bg-[#555774]" : ""}`}
                             onClick={() => handleIndex(index)}>
                            <img src="/images/Archive/itemIconArchive.svg" alt="Item Icon" />
                            <span   className={` text-[18px] opacity-80 truncate  ${currentIndex === index ? "text-white" : "text-white opacity-80"}` }
                                    title={item.kpi_name}>{item.kpi_name}</span>
                        </div>
                    ))
                    }
                </div>

                <div className="w-full  bg-[#13131d]">
                    {/*<h2 className="text-[24px] text-center">{data[currentIndex]?.kpi_name || 'Margin'}</h2>*/}
                    <h2 className="text-[16px] text-white my-[20px] text-center">تهیه و بروز رسانی LLD های RNC/BSC و IP Plan eNodeB در فرمت ها و  نرم افزارها مورد درخواست اداره طراحی از جمله Border ها</h2>
                    {
                        loading ? <Loading/>:
                            <div>

                            <div className="bg-[#1F202C] rounded-[8px] w-[calc(100vw-344px)]  p-[32px] mr-[28px]">
                                <div className="flex flex-row items-center justify-between text-white">
                                    <p>میانگین امتیاز</p>

                                    <div className="flex flex-row items-center gap-[24px] py-[10px] px-[16px] rounded-[20px]  bg-[#3D3E53]">
                                        <span>یک  سال اخیر</span>
                                        <img src="/images/Archive/Chevron.svg" alt=""/>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center">
                                    <table className="w-full mt-[20px]">
                                        <thead>
                                            <tr className="bg-[#3d3e53] py-[14px]">
                                                <th className="text-white text-[12px] opacity-90 py-[14px] rounded-r-[8px]">Student ID</th>
                                                <th  className="text-white text-[12px] opacity-90 py-[14px]">Name</th>
                                                <th  className="text-white text-[12px] opacity-90 py-[14px]">Major</th>
                                                <th   className="text-white text-[12px] opacity-90 py-[14px] rounded-l-[8px]">Credits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-white text-center text-[12px] opacity-90 py-[14px] ">3741255</td>
                                                <td className="text-white text-center text-[12px] opacity-90 py-[14px] ">Jones, Martha</td>
                                                <td className="text-white text-center text-[12px] opacity-90 py-[14px] ">Computer Science</td>
                                                <td className="text-white text-center text-[12px] opacity-90 py-[14px] ">240</td>
                                            </tr>


                                        </tbody>

                                    </table>

                                </div>





                                {/*<div className="flex flex-row gap-[28px] ">*/}
                                {/*    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[30%] gap-[35px]">*/}
                                {/*        <h2>Archive</h2>*/}
                                {/*        {trendData.map((item, index) => (*/}
                                {/*            <div className="flex flex-row items-center justify-between" key={index}>*/}
                                {/*                <span className="text-[16px] text-[#757575]">{item.event_name}{item.event_year}</span>*/}
                                {/*                <p className="text-[16px] text-[#424242]">{item.score}</p>*/}
                                {/*            </div>*/}
                                {/*        ))}*/}
                                {/*    </div>*/}

                                {/*    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[69%] gap-[35px]">*/}
                                {/*        <h2>Score Changes</h2>*/}
                                {/*        <div>*/}
                                {/*            {trendData.length > 0 ? <LineCharts trendData={trendData} /> : "ثبت نشده"}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                                <div className="bg-[#1F202C] rounded-[8px] w-[calc(100vw-344px)]  p-[32px] mr-[28px] mt-[30px]">
                                    <div className="flex flex-row items-center justify-between text-white">
                                        <p>میانگین امتیاز</p>

                                        <div className="flex flex-row items-center gap-[24px] py-[10px] px-[16px] rounded-[20px]  bg-[#3D3E53]">
                                            <span>یک  سال اخیر</span>
                                            <img src="/images/Archive/Chevron.svg" alt=""/>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center">
                                        <AreaChart/>

                                    </div>





                                    {/*<div className="flex flex-row gap-[28px] ">*/}
                                    {/*    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[30%] gap-[35px]">*/}
                                    {/*        <h2>Archive</h2>*/}
                                    {/*        {trendData.map((item, index) => (*/}
                                    {/*            <div className="flex flex-row items-center justify-between" key={index}>*/}
                                    {/*                <span className="text-[16px] text-[#757575]">{item.event_name}{item.event_year}</span>*/}
                                    {/*                <p className="text-[16px] text-[#424242]">{item.score}</p>*/}
                                    {/*            </div>*/}
                                    {/*        ))}*/}
                                    {/*    </div>*/}

                                    {/*    <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[69%] gap-[35px]">*/}
                                    {/*        <h2>Score Changes</h2>*/}
                                    {/*        <div>*/}
                                    {/*            {trendData.length > 0 ? <LineCharts trendData={trendData} /> : "ثبت نشده"}*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>

                            </div>

                    }

                </div>
            </div>
        </div>
    );
};

export default ShowDataArchive;

