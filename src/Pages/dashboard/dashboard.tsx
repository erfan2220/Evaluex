//@ts-nocheck
import ActiveEvents from "../../components/Active/ActiveEvents/ActiveEvents.tsx";
import Archive from "../../components/Archive/ArchiveEvents/Archive.tsx";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Cookies from 'js-cookie'
import axios from "axios";
import ProvincesArchives from "../../components/Province Report/provincesArchives/provincesArchives.tsx";
import {useNavigate} from "react-router-dom";

const Dashboard = () =>
{
    const [activeOpen,setActiveOpen]=useState(true)
    const [archiveOpen,setArchiveOpen]=useState(true)
    const [provinceReportOpen,setProvinceReportOpen]=useState(true)
    const [data,setData]=useState([])
    const [dataArchive,setDataArchive]=useState([])

    const navigate=useNavigate()

    const oneLoginToken = Cookies.get('oneLoginToken');
    const oneLoginUsername = Cookies.get('oneLoginUserName');
    const onlLoginCondition =Cookies.get('oneLogin');

    console.log("oneloginUsername",oneLoginUsername)


        const handleActiveEvents =()=>
        {
            setActiveOpen(!activeOpen)
        }
        const handleArchiveEvents =(data,dataArchive)=>
        {

            navigate('/archiveList',{ state: {data ,dataArchive}});
            // setArchiveOpen(!archiveOpen)
        }
        const handleProvinceReport=()=>
        {
            setProvinceReportOpen(!provinceReportOpen)
        }


        const handleData=(response)=>{
            setData(response.data);
            console.log("rerererrere",response.data)
        }

    const postData = () =>
    {
        axios.post("http://10.15.90.87:5020/api/user_groups/", { user: oneLoginUsername })
            .then((response) => {
                console.log("Post response:", response.data);
                setDataArchive(response.data)
                // Optionally handle the response or update the state
            })
            .catch((error) => {
                console.error("There was an error posting the data!", error);
            });
    };


    useEffect(() =>
    {
        postData()
        axios.get('http://10.15.90.87:5020/api/events/')
            .then(response =>
            {
                handleData(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [oneLoginUsername]);




    return (
        <div>
            <h2 className="text-white text-[18px] font-[600] font-['customMontserrat']">کاربر عزیز خوش آمدید.</h2>
            <span className="text-[18px] font-[600] text-white opacity-50 " >لطفا برای امتیازدهی روی دوره فعال مورد نظر کلیک کنید. </span>

            <div className=" flex flex-row justify-between items-center py-[13px] px-[24px] rounded-[8px] mt-[32px] ">
                <span className="text-[16px] opacity-80 text-[#fff]">دوره های فعال</span>

            </div>

            <div  className="flex flex-row gap-[29px] mt-[24px] w-full ">
                {
                    activeOpen && data.map((item)=>(
                        !item.archived && (
                            <ActiveEvents key={item.id} name={item.name} season={item.name} year={item.year} provinceName={dataArchive} />
                        )
                    ))
                }
            </div>

            {/*{*/}
            {/*    activeOpen &&*/}
            {/*    (<motion.div className="flex flex-row gap-[29px] mt-[24px] ">*/}
            {/*        <ActiveEvents name={"بهار 1403"} provinceName={dataArchive} />*/}
            {/*        <ActiveEvents name={"زمستان 1402"} provinceName={dataArchive}/>*/}

            {/*    </motion.div>)*/}
            {/*}*/}


        <div className=" flex flex-row justify-between items-center py-[13px] px-[24px] rounded-[8px] mt-[32px]">
                <span className="text-[16px] opacity-80 text-[#fff]">آرشیو دوره های قبل</span>

            <div className="flex flex-row items-center gap-[16px] cursor-pointer"  onClick={()=>{
                handleArchiveEvents(data,dataArchive)
            }}>
                <span className="text-[#2276FC] opacity-80 text-[16px]">مشاهده همه دوره ها</span>
                <div className="bg-[#232431] w-[40px] h-[40px] flex items-center justify-center">
                    <img src="/images/Archive/arrow-down.svg"
                         className={archiveOpen ? "cursor-pointer" : "cursor-pointer rotate-180"}
                         alt=""/>
                </div>
            </div>
        </div>


            <div  className="flex flex-row gap-[29px] mt-[24px]">
                {archiveOpen  && data.map((item)=>
                        <motion.div className="flex flex-row gap-[29px]  ">
                            <Archive name={item.group} season={item.name} year={item.year} data2={data} dataArchive={dataArchive}/>
                        </motion.div>
                    )
                }
            </div>



            <div className=" flex flex-row justify-between items-center py-[13px] px-[24px] rounded-[8px] mt-[32px]">
                <span className="text-[16px] opacity-80 text-[#fff]">گزارشهای استانی</span>
                <div className="flex flex-row items-center gap-[16px] cursor-pointer"  onClick={()=>{
                    handleArchiveEvents(data,dataArchive)
                }}>
                    {
                        dataArchive.length >6 &&
                        (
                            <div className="flex flex-row items-center gap-[16px]">
                                 <span className="text-[#2276FC] opacity-80 text-[16px]">مشاهده همه استان ها</span>
                                            <div className="bg-[#232431] w-[40px] h-[40px] flex items-center justify-center">
                                            <img src="/images/Archive/arrow-down.svg"
                                            className={archiveOpen ? "cursor-pointer" : "cursor-pointer rotate-180"}
                                        alt=""/>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
            <div  className="flex flex-row gap-[29px] my-[24px]">
                {provinceReportOpen &&
                    dataArchive.slice(0,6).map((item)=>
                        <motion.div className="flex flex-row gap-[29px]">
                            <ProvincesArchives name={item.group} data2={dataArchive} kpiArchiveData={data}/>
                        </motion.div>
                    )
                }
            </div>
            {/*{*/}
            {/*    archiveOpen && (*/}
            {/*        <motion.div className="flex flex-row gap-[29px] mt-[24px] ">*/}
            {/*            <Archive name={"بهار 1403"}/>*/}
            {/*            <Archive name={"زمستان 1402"}/>*/}
            {/*        </motion.div>*/}
            {/*    )*/}
            {/*}*/}


        </div>
    );
};

export default Dashboard;