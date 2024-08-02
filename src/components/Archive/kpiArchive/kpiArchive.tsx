//@ts-nocheck
import  {useEffect, useState} from "react";

import {useLocation} from "react-router-dom";
import Item from "./Item.tsx"
import axios from "axios";

const KpiArchive = () =>
{

    const location = useLocation();
    const { selectedName } = location.state || {}; // Default to an empty object if state is undefined


    const [data, setData] = useState(["test"]);

    useEffect(() => {
        if (selectedName) {
            axios.post('http://10.15.90.87:5020/api/archive/', {
                province: selectedName
            })
                .then(response => {
                    setData(response.data);

                    console.log("rerererererer",response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedName]);


    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h2 className="text-[18px] text-black">{selectedName}</h2>
                    <span className="text-[18px] font-[600] opacity-50">You can select Event from list </span>
                </div>

                <div className="flex flex-row items-center text-white
                py-[15px] px-[28px] gap-[12px] rounded-[8px] border-[1px] border-[#BFB3B3] w-[467px]">
                    <img src="/images/active/search.svg" alt=""/>
                    <input type="text"  placeholder="Search KPI Name" className="text-[#757575] text-[16px]
                    outline-none border-none h-full w-full"/>

                </div>

            </div>

            <div className="flex flex-row gap-[29px] mt-[48px]">
                {data.map((item)=>(
                     <Item name={item} kpiArchiveData={data} />
                 ))
                }
            </div>
        </div>
    );
};

export default KpiArchive;
