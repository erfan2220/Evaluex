//@ts-nocheck

import React, { useContext } from "react";
import Archive from "../../Archive/ArchiveEvents/Archive.tsx";
import { SelectedNameContext } from "../../../App.tsx";
import ActiveEvents from "../ActiveEvents/ActiveEvents.tsx";
import Item from "./Item.tsx.tsx";
import ItemActive from "../Item/ItemActive.tsx";
import ItemDeActive from "../Item/ItemDeActive.tsx";

const UploadPage = () => {
    const { selectedActiveName, setSelectedActiveName } = useContext(SelectedNameContext);

    return (
        <div>
            <div className=" bg-[#131423] w-100 h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">
                <img src="/images/active/arrow-left.svg" alt="" className="cursor-pointer"/>

                <div className="flex flex-row gap-[23px]">
                    <img src="/images/dashboard/Gear.svg" alt="" width={32} height={32} className="cursor-pointer"/>
                    <img src="/images/dashboard/user.svg" alt="" width={32} height={32} className="cursor-pointer"/>
                </div>

            </div>

            <div className="mx-[56px] mt-[40px]">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-[18px] text-[#212121]">{selectedActiveName}</h2>
                        <span className="font-[600] text-[#212121] text-[18px] opacity-50">Please choose the Province you want to score</span>
                    </div>

                    <div className="w-[480px] flex flex-row items-center gap-[12px] border-[1px]
                     border-solid border-[#BFB3B3] rounded-[8px] py-[15px] px-[28px] overflow-hidden">
                        <img src="/images/active/search.svg" alt="" className="cursor-pointer"/>
                        <input className="outline-none border-none" type="text" placeholder="Search KPI Name"/>

                    </div>

                </div>

                <div className="flex flex-row items-center gap-[29px] mt-[40px]">
                    <ItemActive name={selectedActiveName}/>
                    <ItemActive name={selectedActiveName}/>
                    <ItemDeActive name={selectedActiveName}/>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
