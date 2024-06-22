//@ts-nocheck

import React, { useContext } from "react";
import Archive from "../../Archive/ArchiveEvents/Archive.tsx";
import { SelectedNameContext } from "../../../App.tsx";
import ActiveEvents from "../ActiveEvents/ActiveEvents.tsx";
import Item from "./Item.tsx.tsx";
import ItemActive from "../Item/ItemActive.tsx";
import ItemDeActive from "../Item/ItemDeActive.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const ProvinceSelector = () => {
    // const { selectedActiveName, setSelectedActiveName } = useContext(SelectedNameContext);

    const location = useLocation();
    const { selectedName } = location.state || {};


    return (
        <div>
            <h2 className="text-[18px] text-[#212121]">{selectedName}</h2>
            <span className="font-[600] text-[#212121] text-[18px] opacity-50">Please choose the Province you want to score</span>
            <div className="flex flex-row items-center gap-[29px] mt-[40px]">
                <ItemActive name={selectedName} />
                <ItemActive name={selectedName} />
                <ItemDeActive name={selectedName} />
            </div>
        </div>
    );
};

export default ProvinceSelector;
