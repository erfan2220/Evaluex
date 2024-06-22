//@ts-nocheck
import {useNavigate} from "react-router-dom";

const ItemActive = ({name}) =>
{

    const navigate = useNavigate();

    const handleLink = (name) => {
        navigate('/tableKpis', { state: { selectedName: name } });
    };

    return (
        <div
            className=" bg-[#fff] rounded-[16px] w-[196px] h-[120px] flex items-center justify-center border-[1px] border-solid border-[#DDD4D4] cursor-pointer"
            onClick={()=>{handleLink(name)}}
        >
            <span className="font-[600] text-[#212121] text-[18px]">{name}</span>
        </div>
    );
};

export default ItemActive;