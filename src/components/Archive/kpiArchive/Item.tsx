//@ts-nocheck
import {useNavigate} from "react-router-dom";


const Item = ({name,data}) =>
{

    const navigate = useNavigate();

    const mixedDataName = `${name?.event_name || ""}  ${name?.event_year || ""}`; // Safely concatenate strings
    // console.log("mixxxxxx",mixedDataName)
    const handleClick=(name)=>
    {
        navigate('/showData',{ state: { selectedName: name,mixedDataName:mixedDataName } })
    }
    return (
        <div className=" bg-[#fff] rounded-[16px] w-[196px] h-[120px]
         flex items-center justify-center border-[1px]
         border-solid border-[#DDD4D4] cursor-pointer" onClick={()=>{
            handleClick(name)
        }}>
            <span className="font-[600] text-[#212121] text-[18px]">{name.event_name} {name.event_year}</span>
        </div>
    );
};

export default Item;