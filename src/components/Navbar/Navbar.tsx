//@ts-nocheck


const Navbar = () =>
{
    return (
        <div className=" bg-[#131423] w-100 h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">
            <h3 className="text-[20px] opacity-80 text-[#fff]">Evalue X</h3>

            <div className="flex flex-row gap-[23px]">
                <img src="/images/dashboard/Gear.svg" alt="" width={32} height={32}/>
                <img src="/images/dashboard/user.svg" alt="" width={32} height={32}/>
            </div>

        </div>
    );
};

export default Navbar;