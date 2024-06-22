//@ts-nocheck
import ActiveEvents from "../../components/Active/ActiveEvents/ActiveEvents.tsx";
import Archive from "../../components/Archive/ArchiveEvents/Archive.tsx";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";

const Dashboard = () =>
{



    const [activeOpen,setActiveOpen]=useState(true)
    const [archiveOpen,setArchiveOpen]=useState(true)
    const [data,setData]=useState([])
    const [dataArchive,setDataArchive]=useState([])





        const handleActiveEvents =()=>
        {
            setActiveOpen(!activeOpen)
        }
        const handleArchiveEvents =()=>
        {
            setArchiveOpen(!archiveOpen)
        }


        const handleData=(response)=>{
            setData(response.data);
            console.log("rerererrere",response.data)
        }

    const postData = () => {
        axios
            .post("http://192.168.129.209:5001/api/user_groups/", { user: "mohsen" })
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
        axios.get('http://192.168.129.209:5001/api/events/')
            .then(response =>
            {
                handleData(response)

            })
            .catch(error => {
                console.log(error);
            });
    }, []);




    return (
        <div>
            <h2 className="text-[#212121] text-[18px] font-[600] font-['customMontserrat']">Welcome to EvalueX</h2>
            <span className="text-[18px] font-[600] opacity-50 text-[#212121] " >Please choose the Event you want </span>

            <div className="bg-[#3E4DCE] flex flex-row justify-between items-center py-[13px] px-[24px] rounded-[8px] mt-[32px] ">
                <span className="text-[#fff]">Active Events</span>
                <img src="/images/dashboard/arrow-down.svg"
                     className={activeOpen ? "" : "rotate-180"}
                     alt="" onClick={()=>{
                    handleActiveEvents()
                }}/>
            </div>

            {/*{   data.map((item)=>*/}
            {/*        {*/}
            {/*            !(item.archived) &&(*/}
            {/*                <div>*/}
            {/*                   iuououiouoiu*/}
            {/*                </div>)*/}

            {/*        }*/}
            {/*    )}*/}
            {
                data.map((item)=>{
                    !(item.archived) &&(
                        <div>
                            iifhslhfsldhfjlih
                        </div>
                    )
                })
            }

            {
                activeOpen &&
                (<motion.div className="flex flex-row gap-[29px] mt-[24px] ">
                    <ActiveEvents name={"بهار 1403"}/>
                    <ActiveEvents name={"زمستان 1402"}/>

                </motion.div>)
            }


            <div
                className="bg-[#3E4DCE] flex flex-row justify-between items-center py-[13px] px-[24px] rounded-[8px] mt-[32px]">
                <span className="text-[#fff]">Archive</span>
                <img src="/images/dashboard/arrow-down.svg"
                     className={archiveOpen ? "" : "rotate-180"}
                     alt="" onClick={()=>{
                    handleArchiveEvents()
                }}/>
            </div>

            {
                dataArchive.map((item)=>
                    <motion.div className="flex flex-row gap-[29px] mt-[24px] ">
                        <Archive name={item.group}/>
                    </motion.div>
                )
            }
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