//@ts-nocheck

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemActiveProps {
    name: string;
}

const ItemActive: React.FC<ItemActiveProps> = ({ name,arrayProvince }) => {
    const navigate = useNavigate();

    const handleLink = (name: string) => {
        navigate('/tableKpis', { state: { selectedName: name,arrayProvince } });
    };

    return (
        <div
            className="bg-[#fff] rounded-[16px] w-[196px] h-[120px] flex items-center justify-center border-[1px] border-solid border-[#DDD4D4] cursor-pointer"
            onClick={() => handleLink(name)}
        >
            <span className="font-[600] text-[#212121] text-[18px]">البرز</span>
        </div>
    );
};

export default ItemActive;
