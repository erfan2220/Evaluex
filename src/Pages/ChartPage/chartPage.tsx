//@ts-nocheck

import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import DoughnutChart from "../../components/Province Report/DoughnutChart/doughnitChart.tsx";

const  menu =[
    {
        name:"دوره های فعال",
        iconUrl:"/images/chartPage/active.svg"
    },
    {
        name:"آرشیو دوره های قبل",
        iconUrl:"/images/chartPage/archive.svg"
    },
    {
        name:"گزارشهای استانی ",
        iconUrl:"/images/chartPage/province.svg"
    },
]
const  ChartPage=()=>
{
    return (
        <div className=" bg-[#13131D]">
            <Navbar/>
                 <div className="flex flex-row items-center  min-h-[calc(100vh-128px)] overflow-hidden">
                    <div className="flex flex-col gap-[28px] bg-[#1F202C] min-h-[calc(100vh-128px)] pt-[32px] w-[22%] pr-[56px] pl-[32px]">
                        {
                            menu.map((item)=>(
                                    <div className="flex flex-row items-center justify-between ">
                                        <div className="flex flex-row items-center gap-[16px] text-white">
                                            <img src={item.iconUrl} alt=""/>
                                            <h2>{item.name}</h2>
                                        </div>
                                        <img src="/images/chartPage/arrow.svg" alt=""/>
                                    </div>
                            ))
                        }

                    </div>

                    <div className="bg-[#13131D] w-full  h-full ">
                        <div className="grid grid-cols-2 gap-[30px] mt-[24px] mr-[28px] ml-[56px] ">
                            <div className="chartItems flex flex-col justify-between p-[24px] bg-[#1F202C]">
                                <h2 className="border-b  border-b-1px border-b-white text-white border-opacity-30 pb-[20px]">استانهای تحت پوشش به ازای هر وندور </h2>
                                <DoughnutChart/>
                            </div>

                        </div>


                    </div>

        </div>
            <Footer/>
        </div>
    );
}

export default ChartPage;