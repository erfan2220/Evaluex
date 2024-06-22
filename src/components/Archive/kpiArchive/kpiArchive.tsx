//@ts-nocheck

import React, { useContext } from "react";
import Archive from "../../Archive/ArchiveEvents/Archive.tsx";

import {useLocation} from "react-router-dom";
import Item from "./Item.tsx";

const KpiArchive = () =>
{


    const location = useLocation();
    const { selectedName } = location.state || {}; // Default to an empty object if state is undefined


    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h2 className="text-[18px] text-black">{selectedName}</h2>
                    <span className="text-[18px] font-[600] opacity-50">You can select kpi from list to rate it</span>
                </div>

                <div className="flex flex-row items-center text-white
                py-[15px] px-[28px] gap-[12px] rounded-[8px] border-[1px] border-[#BFB3B3] w-[467px]">
                    <img src="/images/active/search.svg" alt=""/>
                    <input type="text"  placeholder="Search KPI Name" className="text-[#757575] text-[16px]
                    outline-none border-none h-full w-full"/>

                </div>

            </div>

            <div className="flex flex-row gap-[29px] mt-[48px]">
                <Item name={selectedName}/>
                <Item name={selectedName}/>
                <Item name={selectedName}/>



            </div>
        </div>
    );
};

export default KpiArchive;
