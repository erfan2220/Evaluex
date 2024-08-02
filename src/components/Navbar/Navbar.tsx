//@ts-nocheck

import {useEffect, useState} from "react";
import {useAuth} from "../Auth/AuthContext.tsx";
import Cookies from 'js-cookie';
import {Link, useLocation} from "react-router-dom";


const Navbar = () =>
{

    const [userProfile, setUserProfile] = useState(false);
    const { login, setLogin } = useAuth();
    // const refreshTokenValueFixed = refreshTokenValue ? refreshTokenValue.split('=')[1] : '';

    const [openMenu,setOpenMenu]=useState(false)
    const [menuIndex,setMenuIndex]=useState(1)

    const location=useLocation()


    const oneLoginToken = Cookies.get('oneLoginToken');
    const oneLoginUsername = Cookies.get('oneLoginUserName');
    const onlLoginCondition =Cookies.get('oneLogin');

    let userName = document.cookie.split(';').find(c => c.trim().startsWith('userName=') || c.trim().startsWith('oneLoginUserName='));
    const userNameValue = userName ? userName.split('=')[1] : '';


    const deleteOnelogin =()=>{
        document.cookie = `oneLogin=false; path=/;domain=10.15.90.87;`;
    };

    const logout = async () =>
    {
        // const oneLoginToken = getCookie('oneLoginToken');
        // const oneLoginUsername = getCookie('oneLoginUserName');
        // // const onLoginCondition = document.cookie.split(';').find(c => c.trim().startsWith('oneLogin='));
        // const onLoginCondition =getCookie('oneLogin=');\
        const oneLoginToken = Cookies.get('oneLoginToken');
        const oneLoginUsername = Cookies.get('oneLoginUserName');
        const onlLoginCondition =Cookies.get('oneLogin');



        console.log("skdsdjnfskl;jflsjfljksdljkf",oneLoginToken,oneLoginUsername,onlLoginCondition)

        // const onLoginConditionValue = onLoginCondition ? onLoginCondition.split('=')[1] : '';
        // const name =hhhh()
        // console.log("onlLoginConditionValue",name)
        deleteOnelogin()

        // const allCookies = document.cookie.split(';');
        // for (const cookie of allCookies) {
        //     const cookieName = cookie.split('=')[0].trim();
        //     document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // }
        // window.location.href = "/login";
        // deleteCookie('token');
        // deleteCookie('oneLoginToken');
        // deleteCookie('refreshToken');
        // deleteCookie('userName');
        //
        // window.location.href="/login";
        // console.log(`Attempting to logout with refreshToken=${refreshTokenValue}`);
        if(  (oneLoginToken  && oneLoginUsername) &&(!onlLoginCondition) )
        {
            setLogin(false)
            window.location.href="http://10.15.90.87:8081"
        }



        try {
            const responseLogout = await fetch(`http://10.15.90.87:8000/api/userlogout?username=${userNameValue}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            console.log("responseLogout", responseLogout);

            if (responseLogout.ok) {
                setLogin(false);
                window.location.href = "/login";
            } else {
                console.error("Failed to logout", responseLogout);
            }
        } catch (error) {
            console.error("Error during logout", error);
        }
    };

    useEffect(()=>{
        if(  (oneLoginToken  && oneLoginUsername) &&(!onlLoginCondition) )
        {
            setLogin(false)
            window.location.href="http://10.15.90.87:8081"

        }
    },[])

   const handleMenu=()=>{
        setOpenMenu(!openMenu)
   }
   const handleMenuIndex=(index)=>
   {

       setMenuIndex(index)
   }

    return (
        <div className=" bg-[#282936] w-100 h-[80px] py-[24px] pl-[56px] pr-[51px] flex flex-row justify-between items-center">


            <div className="flex flex-row  items-center gap-[86px]">
                <h3 className="text-[20px] opacity-80 text-[#fff]">Evalue X</h3>

                <div className="flex flex-row items-center text-white gap-[26px]">
                    <Link to="/dashboard"
                          className={location.pathname === "/dashboard" ? " border-b-[2px] border-[#4A90EC]" : ""}
                    >صفحه اصلی</Link>
                    <Link to="/chart"
                          className={location.pathname === "/chart" ? " border-b-[2px] border-[#4A90EC]" : ""}
                    >داشبورد</Link>
                </div>
            </div>

            <div className="flex flex-row gap-[23px] relative">
                <img src="../../../dist/images/Archive/not.svg" alt="" width={32} height={32}/>
                <img src="/images/dashboard/user.svg" alt="" width={32} height={32} onClick={()=>handleMenu()}/>
                {
                    openMenu && (
                        <div className="menuItems w-[191px] absolute right-0 top-[45px] flex flex-col gap-[20px] rounded-[16px] bg-[#272739] py-[18px] px-[16px]">
                            <div className={menuIndex===1 ? "cursor-pointer text-[#007BFF] flex flex-row items-center  gap-[10px]":" cursor-pointer  flex flex-row  items-center gap-[10px]"} onClick={()=>handleMenuIndex(1)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.9">
                                        <path d="M16.25 6.25H13.75V4.375C13.75 3.38044 13.3549 2.42661 12.6517 1.72335C11.9484 1.02009 10.9946 0.625 10 0.625C9.00544 0.625 8.05161 1.02009 7.34835 1.72335C6.64509 2.42661 6.25 3.38044 6.25 4.375V6.25H3.75C3.41848 6.25 3.10054 6.3817 2.86612 6.61612C2.6317 6.85054 2.5 7.16848 2.5 7.5V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V7.5C17.5 7.16848 17.3683 6.85054 17.1339 6.61612C16.8995 6.3817 16.5815 6.25 16.25 6.25ZM7.5 4.375C7.5 3.71196 7.76339 3.07607 8.23223 2.60723C8.70107 2.13839 9.33696 1.875 10 1.875C10.663 1.875 11.2989 2.13839 11.7678 2.60723C12.2366 3.07607 12.5 3.71196 12.5 4.375V6.25H7.5V4.375ZM16.25 16.25H3.75V7.5H16.25V16.25ZM10.9375 11.875C10.9375 12.0604 10.8825 12.2417 10.7795 12.3958C10.6765 12.55 10.5301 12.6702 10.3588 12.7411C10.1875 12.8121 9.99896 12.8307 9.8171 12.7945C9.63525 12.7583 9.4682 12.669 9.33709 12.5379C9.20598 12.4068 9.11669 12.2398 9.08051 12.0579C9.04434 11.876 9.06291 11.6875 9.13386 11.5162C9.20482 11.3449 9.32498 11.1985 9.47915 11.0955C9.63332 10.9925 9.81458 10.9375 10 10.9375C10.2486 10.9375 10.4871 11.0363 10.6629 11.2121C10.8387 11.3879 10.9375 11.6264 10.9375 11.875Z"
                                              fill={menuIndex===1 ?"#007BFF":"white"}/>
                                    </g>
                                </svg>
                                <span  className={menuIndex===1? "text-[#007BFF]":"text-white"}>Change Password</span>

                            </div>

                            <div  className={menuIndex===2? "cursor-pointer  text-[#007BFF] flex flex-row gap-[10px]":"cursor-pointer  flex flex-row  items-center gap-[10px]"} onClick={()=>handleMenuIndex(2)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.9">
                                        <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM11.25 13.75C11.25 13.9158 11.1842 14.0747 11.0669 14.1919C10.9497 14.3092 10.7908 14.375 10.625 14.375C10.2935 14.375 9.97554 14.2433 9.74112 14.0089C9.5067 13.7745 9.375 13.4565 9.375 13.125V10C9.20924 10 9.05027 9.93415 8.93306 9.81694C8.81585 9.69973 8.75 9.54076 8.75 9.375C8.75 9.20924 8.81585 9.05027 8.93306 8.93306C9.05027 8.81585 9.20924 8.75 9.375 8.75C9.70652 8.75 10.0245 8.8817 10.2589 9.11612C10.4933 9.35054 10.625 9.66848 10.625 10V13.125C10.7908 13.125 10.9497 13.1908 11.0669 13.3081C11.1842 13.4253 11.25 13.5842 11.25 13.75ZM8.75 6.5625C8.75 6.37708 8.80499 6.19582 8.908 6.04165C9.01101 5.88748 9.15743 5.76732 9.32874 5.69636C9.50004 5.62541 9.68854 5.60684 9.8704 5.64301C10.0523 5.67919 10.2193 5.76848 10.3504 5.89959C10.4815 6.0307 10.5708 6.19775 10.607 6.3796C10.6432 6.56146 10.6246 6.74996 10.5536 6.92127C10.4827 7.09257 10.3625 7.23899 10.2084 7.342C10.0542 7.44502 9.87292 7.5 9.6875 7.5C9.43886 7.5 9.20041 7.40123 9.02459 7.22541C8.84878 7.0496 8.75 6.81114 8.75 6.5625Z"
                                              fill={menuIndex===2 ?"#007BFF":"white"}/>
                                    </g>
                                </svg>
                            <span  className={menuIndex==2? "text-[#007BFF]":"text-white"}>About</span>

                            </div>

                            <div
                                className={menuIndex===3? "cursor-pointer  text-[#007BFF] flex flex-row items-center  gap-[10px]":"cursor-pointer flex flex-row  items-center gap-[10px]"}
                                onClick={()=>
                                {
                                    setLogin(false);
                                     logout()
                                    handleMenuIndex(3)}
                                }>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.9">
                                        <path d="M8.75 16.875C8.75 17.0408 8.68415 17.1997 8.56694 17.3169C8.44973 17.4342 8.29076 17.5 8.125 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H8.125C8.29076 2.5 8.44973 2.56585 8.56694 2.68306C8.68415 2.80027 8.75 2.95924 8.75 3.125C8.75 3.29076 8.68415 3.44973 8.56694 3.56694C8.44973 3.68415 8.29076 3.75 8.125 3.75H3.75V16.25H8.125C8.29076 16.25 8.44973 16.3158 8.56694 16.4331C8.68415 16.5503 8.75 16.7092 8.75 16.875ZM17.3172 9.55781L14.1922 6.43281C14.0749 6.31554 13.9159 6.24965 13.75 6.24965C13.5841 6.24965 13.4251 6.31554 13.3078 6.43281C13.1905 6.55009 13.1247 6.70915 13.1247 6.875C13.1247 7.04085 13.1905 7.19991 13.3078 7.31719L15.3664 9.375H8.125C7.95924 9.375 7.80027 9.44085 7.68306 9.55806C7.56585 9.67527 7.5 9.83424 7.5 10C7.5 10.1658 7.56585 10.3247 7.68306 10.4419C7.80027 10.5592 7.95924 10.625 8.125 10.625H15.3664L13.3078 12.6828C13.1905 12.8001 13.1247 12.9591 13.1247 13.125C13.1247 13.2909 13.1905 13.4499 13.3078 13.5672C13.4251 13.6845 13.5841 13.7503 13.75 13.7503C13.9159 13.7503 14.0749 13.6845 14.1922 13.5672L17.3172 10.4422C17.3753 10.3841 17.4214 10.3152 17.4529 10.2393C17.4843 10.1635 17.5005 10.0821 17.5005 10C17.5005 9.91787 17.4843 9.83654 17.4529 9.76066C17.4214 9.68479 17.3753 9.61586 17.3172 9.55781Z"
                                              fill={menuIndex===3 ?"#007BFF":"white"}/>
                                    </g>
                                </svg>
                                <span className={menuIndex===3? "text-[#007BFF]":"text-white"} >Log Out</span>

                            </div>
                        </div>
                    )
                }
            </div>


        </div>
    );
};

export default Navbar;