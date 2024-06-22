//@ts-nocheck
import {useState} from "react";
import {useLocation} from "react-router-dom";
import LineCharts from "../LineChart/lineChart.tsx";

const ShowData = () =>
{
    const [currentIndex,setCurrentIndex]=useState(1)


    const location = useLocation();
    const { selectedName } = location.state || {}; // Default to an empty object if state is undefined


    const handleIndex =(index:number)=>
    {
        setCurrentIndex(index)
    }

    return (
        <div>
            <div className=" bg-[#131423] w-100 h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">
                <h3 className="text-[20px] opacity-80 text-[#fff]">Evalue X</h3>

                <div className="flex flex-row gap-[23px]">
                    <img src="/images/dashboard/Gear.svg" alt="" width={32} height={32}/>
                    <img src="/images/dashboard/user.svg" alt="" width={32} height={32}/>
                </div>

            </div>
            <div className="bg-[#f8f9fb] flex flex-row">

                <div className="menuPartsArchive bg-[#131423]  flex flex-col  pt-[24px] px-[32px] w-[324px] h-[calc(100vh-80px)]">
                    <div
                        className={currentIndex === 1 ? "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] bg-[#6974D3] rounded-[8px] cursor-pointer" :
                            "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer"}
                        onClick={() => {
                            handleIndex(1)
                        }}>
                        <img src="/images/Archive/itemIconArchive.svg" alt=""/>
                        <span className="text-white text-[18px] opacity-80">site counts</span>
                    </div>

                    <div
                        className={currentIndex === 2 ? " pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] bg-[#6974D3] rounded-[8px] cursor-pointer" :
                            "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer"}
                        onClick={() => {
                            handleIndex(2)
                        }}>
                        <img src="/images/Archive/itemIconArchive.svg" alt=""/>
                        <span className="text-white text-[18px] opacity-80">Costs</span>
                    </div>

                    <div
                        className={currentIndex === 3 ? " pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] bg-[#6974D3] rounded-[8px] cursor-pointer" :
                            "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer"}
                        onClick={() => {
                            handleIndex(3)
                        }}>
                        <img src="/images/Archive/itemIconArchive.svg" alt=""/>
                        <span className="text-white text-[18px] opacity-80">Profit</span>
                    </div>

                    <div
                        className={currentIndex === 4 ? "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] bg-[#6974D3] rounded-[8px] cursor-pointer" :
                            "pl-[24px] item flex flex-row items-center gap-[12px] py-[12px] rounded-[8px] cursor-pointer"}
                        onClick={() => {
                            handleIndex(4)
                        }}>
                        <img src="/images/Archive/itemIconArchive.svg" alt=""/>
                        <span className="text-white text-[18px] opacity-80">Margin</span>
                    </div>

                </div>

                <div className="m-[32px]">
                    <h2 className="text-[24px] ">Margin</h2>

                    <div className="bg-white rounded-[8px] w-[calc(100vw-400px)] mt-[24px] p-[32px]">

                        <div
                            className="bg-[#F4F4FC] py-[23px] pl-[43px] pr-[61px] flex flex-row items-center w-full justify-between ">


                            <div className="text-center">
                                <h2 className="text-[18px]">
                                    The score in بهار 1403 is :
                                </h2>

                                <p className="text-[20px] text-[#007BFF] mt-[15px]">95</p>
                            </div>

                            <img src="/images/Archive/showMessageIcon.svg" alt=""/>


                        </div>


                        <div className="flex flex-row gap-[28px] mt-[28px]">
                            <div className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[30%] gap-[35px]">
                                <h2>Archive</h2>

                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>

                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-[16px] text-[#757575]">زمستان 1402</span>
                                    <p className="text-[16px] text-[#424242]">41</p>

                                </div>


                            </div>


                            <div
                                className="border-solid border-[1px] border-[#EEEEEE] flex flex-col p-[24px] w-[69%] gap-[35px]">
                                <h2>Score Changes</h2>

                                <div>
                                    <LineCharts/>
                                </div>


                            </div>


                        </div>


                    </div>


                </div>

            </div>
        </div>
    );
};

export default ShowData;