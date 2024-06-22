//@ts-nocheck
import { useNavigate } from 'react-router-dom';




const ActiveEvents = ({name}) => {

    const navigate = useNavigate();

    const handleLink = (name) => {
        navigate('/province', { state: { selectedName: name } });
    };

    return (
        <div className=" bg-[#EFF1FF] rounded-[16px] w-[196px] h-[120px] flex items-center justify-center border-[1px] border-solid border-[#DDD4D4] cursor-pointer" onClick={()=>{
            handleLink(name)
        }}>
            <span className="font-[600] text-[#3E4DCE] text-[18px]">{name}</span>
        </div>
    );
};

export default ActiveEvents;