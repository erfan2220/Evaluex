//@ts-nocheck
import {useLocation, useNavigate} from "react-router-dom";



const ProvincesArchives = ({name,data2,kpiArchiveData}) =>
{

    const navigate = useNavigate();

    const location = useLocation();
    const {selectedName} = location.state || {};

    const handleClick=(name)=>
    {
        navigate('/showDataArchive',{ state: { selectedName: name,kpiArchiveData } })
    }
    return (
        <div className=" bg-[#1F202C] rounded-[16px] w-[246px] h-[145px]
         flex flex-col gap-[24px] items-center justify-center  cursor-pointer" onClick={()=>{
            handleClick(name)
        }}>
            <img src="/images/dashboard/provinceArchiveIcon.svg" alt=""/>
            <span className="font-[600] text-white text-[18px]">{name}</span>
        </div>
    );
};

export default ProvincesArchives;