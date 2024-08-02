//@ts-nocheck
import { useNavigate } from 'react-router-dom';




const ActiveEvents = ({name,season, year,provinceName,kpiArchiveData2}) => {

    const navigate = useNavigate();

    console.log("kpiArchive2",kpiArchiveData2)

    const handleLink = (name) => {
        navigate('/province', { state: { selectedName: name,provinceName:provinceName,kpiArchiveData2 } });
    };

    return (
        <div className=" bg-[#1F202C] rounded-[6px] w-[246px] h-[145px] flex flex-col items-center justify-center   cursor-pointer" onClick={()=>{
            handleLink(name)
        }}>
            <img src="/images/active/Star.svg" alt=""/>
            <span className="font-[600] text-white text-[18px]">{season} {year}</span>
            <span className="text-[#5395FF] text-[12px] opacity-90">4 روز تا پایان امتیازدهی</span>
        </div>
    );
};

export default ActiveEvents;