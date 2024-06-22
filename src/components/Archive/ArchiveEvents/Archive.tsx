//@ts-nocheck
import {useNavigate} from "react-router-dom";



const Archive = ({name}) =>
{
    const navigate = useNavigate();

    const handleClick=(name)=>
    {
        navigate('/kpiArchive',{ state: { selectedName: name } })
    }
    return (
        <div className=" bg-[#fff] rounded-[16px] w-[196px] h-[120px]
         flex items-center justify-center border-[1px]
         border-solid border-[#DDD4D4] cursor-pointer" onClick={()=>{
            handleClick(name)
        }}>
            <span className="font-[600] text-[#212121] text-[18px]">{name}</span>
        </div>
    );
};

export default Archive;