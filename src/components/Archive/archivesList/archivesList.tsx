import {useLocation, useNavigate} from "react-router-dom";

const ArchivesList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data,dataArchive } = location.state || {}; // Default to an empty object if state is undefined


    const handleClick=(name)=>
    {
        // navigate('/kpiArchive',{ state: { selectedName: name,data2 } })
        navigate('/dataTable',{ state: { selectedName: name,data,dataArchive}})
    }
    return (
        <div className="grid grid-cols-5 gap-[24px]">
            {
                data.map((item)=>
                    (
                    <div className=" bg-[#1F202C] rounded-[16px]  h-[72px] pr-[26px]
                         flex flex-row  items-center  gap-[16px]  cursor-pointer" onClick={()=>{
                                handleClick(item.name)
                            }}>
                                <img src="/images/dashboard/Calender.svg" alt=""/>
                                <span className="font-[600] text-white  text-[18px]">{item.name} {item.year}</span>
                    </div>
                ))}
        </div>
    );
};

export default ArchivesList;