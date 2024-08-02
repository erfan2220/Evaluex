//@ts-nocheck

import { useLocation } from "react-router-dom";
import ItemActive from "../Item/ItemActive.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";

const ProvinceSelector = () => {
    const location = useLocation();
    const state = location.state || {};
    const { selectedName, provinceName = [],kpiArchiveData2 } = state;

    console.log("prorooror",provinceName)




    return (
        <div>
            <h2 className="text-[18px] text-[#212121]">{selectedName}</h2>
            <span className="font-[600] text-[#212121] text-[18px] opacity-50">Please choose the Province you want to score</span>
            <div className="flex flex-row items-center gap-[29px] mt-[40px]">
                {provinceName.map((province, index) => (
                    <ItemActive key={index} name={"البرز"} arrayProvince={provinceName} />
                ))}
            </div>
        </div>
    );
};

export default ProvinceSelector;
