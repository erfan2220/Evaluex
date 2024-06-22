//@ts-nocheck
const ItemDeActive = ({name}) => {
    return (
        <div
            className=" bg-[#F6F6F6] rounded-[16px] w-[196px] h-[120px] flex items-center justify-center border-[1px] border-solid border-[#DDD4D4] cursor-pointer">
            <span className=" text-[#212121] text-[18px] opacity-60">{name}</span>
        </div>
    );
};

export default ItemDeActive;