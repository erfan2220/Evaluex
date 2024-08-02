//@ts-nocheck
import {useNavigate} from "react-router-dom";



const Archive = ({name,season,year,data2,dataArchive}) =>
{
    const navigate = useNavigate();

    console.log("sgsgsggsgsgs",name)
    const handleClick=(name)=>
    {
        // navigate('/kpiArchive',{ state: { selectedName: name,data2 } })
        navigate('/dataTable',{ state: { selectedName: name,data2,dataArchive } })
    }
    return (
        <div className=" bg-[#1F202C] rounded-[16px] w-[246px] h-[72px] pr-[26px]
         flex flex-row  items-center  gap-[16px]  cursor-pointer" onClick={()=>{
            handleClick(name)
        }}>
            <img src="/images/dashboard/Calender.svg" alt=""/>
            <span className="font-[600] text-white  text-[18px]">{season} {year}</span>
        </div>
    );
};

export default Archive;