//@ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
    setKpis,
    setAttachOpen,
    setDescOpen,
    updateKpiDescription,
    updateKpiScore
} from "../../../features/tableKpisSlice.ts";
import {Link, useLocation} from "react-router-dom";
import Cookies from 'js-cookie'
import Navbar from "../../Navbar/Navbar.tsx";

const TableKpis = () =>
{

    const location = useLocation();
    const { selectedName,arrayProvince } = location.state || { selectedName: "" };

    const dispatch = useDispatch();
    // const currentKpis = useSelector((state) => state.tableKpis.kpis);
    const kpis = useSelector((state: RootState) => state.tableKpis.kpis);
    const attachOpen = useSelector((state) => state.tableKpis.attachOpen);
    const descOpen = useSelector((state) => state.tableKpis.descOpen);

    const [selectedRow, setSelectedRow] = useState([]);
    const [fileAttachments, setFileAttachments] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentDescription, setCurrentDescription] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    const [openDescRowIndex, setOpenDescRowIndex] = useState(null);
    const [selectedDescription,setSelectedDescription]=useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [validationMessage, setValidationMessage] = useState("");
    const [userScores, setUserScores] = useState({});

    const oneLoginToken = Cookies.get('oneLoginToken');
    const oneLoginUsername = Cookies.get('oneLoginUserName');
    const onlLoginCondition =Cookies.get('oneLogin');



    const [data,setData]=useState(null)

    console.log("oneloginUsername",oneLoginUsername)


    console.log("aararararrararararar",arrayProvince)



    const handleData=(responseData)=>
    {
        setData(responseData);
    }

        useEffect(()=>{
            axios.post('http://10.15.90.87:5020/api/archive/', {
                province: selectedName
            })
                .then(response => {
                    handleData(response.data)

                    console.log("rerererererer",response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        },[selectedName])


    useEffect(() => {
        const fetchData = async () =>
        {
            console.log("datatat",data)
            try {
                const response = await axios.post(
                    "http://10.15.90.87:5020/api/scores_list/",
                    {
                          event_id: 2,
                          province_id:data[0]?.province_id
                          } // Data to be sent in the request body
                );
                dispatch(setKpis(response.data)); // Assuming response.data is an array of KPI objects
                console.log("KPI data response:", response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            }
        };
        if (data) { // Only fetch KPI data if data is defined
            fetchData();
        }

    }, [selectedName,data,dispatch]);




    const totalPages = Math.ceil(kpis.length / itemsPerPage);

    const currentKpis = kpis.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };




    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleAttach = (index) => {
        // setSelectedRow((prev) => [...prev, index]);
        setSelectedRow((prev) => prev.includes(index) ? prev : [...prev, index]);
        dispatch(setAttachOpen(!attachOpen));
    };

    const handleDescOpen = (description, index) => {
        setCurrentDescription(description);
        setEditedDescription(description);
        // setSelectedRow((prev) => [...prev, index]);
        setSelectedRow((prev) => prev.includes(index) ? prev : [...prev, index]);
        setOpenDescRowIndex(index);
        setSelectedDescription(description)
        dispatch(setDescOpen(true));
    };



    const handleDescSave = () => {
        const lastSelectedIndex = selectedRow[selectedRow.length - 1];
        if (lastSelectedIndex !== undefined) {
            dispatch(
                updateKpiDescription({
                    index: lastSelectedIndex,
                    description: editedDescription,
                })
            );
            dispatch(setDescOpen(false));
            setOpenDescRowIndex(null);
        } else {
            console.warn(
                "No valid index found in selectedRow for updating description."
            );
        }
    };

    const handleValueChange = (index, value) => {
        setUserScores((prevScores) => ({
            ...prevScores,
            [index]: value,
        }));
        setSelectedRow((prev) => prev.includes(index) ? prev : [...prev, index]);


        dispatch(setKpis((prevKpis) => {
            const updatedKpis = [...prevKpis];
            updatedKpis[index] = {
                ...updatedKpis[index],
                score: value,
            };
            return updatedKpis;
        }));

    };

    const handleScoreChange = (index: number, value: number) => {
        dispatch(updateKpiScore({ index, score: value }));
    };
    const handleInputChange = (index, field, value) => {
        const updatedKpis = [...kpis];
        updatedKpis[index][field] = value;

        if (field === "score") {
            updatedKpis[index] = { ...updatedKpis[index], score: value };
        }
        // Perform validation: Ensure score is within maxScore bounds
        const { score, maxScore } = updatedKpis[index];
        if (Number(score) > Number(maxScore)) {
            alert("Score cannot exceed Max Score.");
            // Reset the score to its previous value or handle as needed
            updatedKpis[index][field] = ""; // Resetting to empty string for example
        }

        dispatch(setKpis(updatedKpis));
        // setSelectedRow((prev) => [...prev, index]);
        setSelectedRow((prev) => prev.includes(index) ? prev : [...prev, index]);
    };

    const handleSave = async () =>
    {
        const hasEmptyScores = selectedRow.some((index) => !kpis[index].score);

        // if (hasEmptyScores) {
        //     setValidationMessage("Please enter a score for all selected KPIs.");
        //     return;
        // }

                try {
                    const selectedKpiData = selectedRow.map((index) => {
                        const kpi = kpis[index];
                        const attachment = fileAttachments[index];
                        if (attachment) {
                            return new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    resolve({
                                        ...kpi,
                                        attachment: {
                                            filename: attachment.name,
                                            data: reader.result,
                                        },
                                    });
                                };
                                reader.onerror = reject;
                                reader.readAsDataURL(attachment);
                            });
                        }
                        return Promise.resolve(kpi);
                    });

                    const kpiDataWithAttachments = await Promise.all(selectedKpiData);

                    const dataToSend =
                        {
                            event_id: 2,
                            province_id: data[0]?.province_id,
                            user: oneLoginUsername,
                            kpiData: kpiDataWithAttachments,
                        };
                    console.log("data to send", dataToSend)

                    const response = await axios.post(
                        "http://10.15.90.87:5020/api/scores_submit/",
                        dataToSend,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("Response data:", response.data);
                    setValidationMessage("KPI data saved successfully.");
                } catch (error) {
                    console.error("Error saving KPI data:", error);
                    setValidationMessage("Error saving KPI data. Please try again.");
                }

        /*try {
            const selectedKpiData = selectedRow.map((index) => kpis[index]);

            // Prepare file data if a file is selected
            let fileData = null;
            if (selectedFile) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    fileData = reader.result;

                    const dataToSend = {
                        event_id: 2,
                        user: "mohsen",
                        kpiData: selectedKpiData,
                        file: fileData,
                    };

                    const response = await axios.post(
                        "http://10.15.90.87:5020/api/scores_submit/",
                        dataToSend,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("Response data:", dataToSend);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                const dataToSend = {
                    event_id: 2,
                    user: "mohsen",
                    kpiData: selectedKpiData,
                };

                const response = await axios.post(
                    "http://10.15.90.87:5020/api/scores_submit/",
                    dataToSend,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("Response data:", dataToSend);
            }
        } catch (error) {
            console.error("Error saving KPI data:", error);
        }*/
       /* try {
            const selectedKpiData = selectedRow.map((index) => kpis[index]);
            const dataToSend = {
                event_id: 2,
                user: "mohsen",
                kpiData: selectedKpiData,
            };

            console.log("Response data:", dataToSend);
            const response = await axios.post(
                "http://10.15.90.87:5020/api/scores_submit/",
                dataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response data:", dataToSend);
        } catch (error) {
            console.error("Error saving KPI data:", error);
        }*/
    };

    const handleFileChange = (e,index) => {
        const file = e.target.files[0];
        if (file) {
            setFileAttachments((prev) => ({
                ...prev,
                [index]: file,
            }));

            console.log("filelelelel",fileAttachments)
            setSelectedFile(file)
        }
    };

    /*const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        // try {
        //     const response = await axios.post("your-file-upload-endpoint", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });
        //     console.log(response.data);
        //     // Handle the response as needed
        // } catch (error) {
        //     console.error("Error uploading file:", error);
        // }
        setSelectedRow((prev) => [...prev, selectedRow[selectedRow.length - 1]]);
    };*/

    const handleFileUpload = async () =>
    {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://10.15.90.87:5020/api/upload_file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            // Handle the response as needed
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        // setSelectedRow((prev) => [...prev, selectedRow[selectedRow.length - 1]]);
        setSelectedRow((prev) => prev.includes(selectedRow[selectedRow.length - 1]) ? prev : [...prev, selectedRow[selectedRow.length - 1]]);
    };


    const handleInputKeyDown = (e, index) => {
        if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            handleInputChange(index, "score", value);
        }
    };


    return (
        <div>
            {/*<header className="bg-[#131423] w-full h-20 py-6 px-14 flex justify-between items-center">*/}
            {/*    <h3 className="text-2xl text-white opacity-80">Evalue X</h3>*/}
            {/*    <div className="flex gap-6">*/}
            {/*        <img src="/images/dashboard/Gear.svg" alt="Settings" width={32} height={32} />*/}
            {/*        <img src="/images/dashboard/user.svg" alt="User" width={32} height={32} />*/}
            {/*    </div>*/}
            {/*</header>*/}
            <Navbar/>
            <main className="bg-[#F8F9FB] min-h-screen">
                <section className="table-kpi-header flex items-center justify-between pt-10 mx-14">
                    <div className="flex flex-col gap-2.5">
                        <h2>{selectedName}</h2>
                        <span className="text-lg text-[#212121] opacity-50">Tehran</span>
                    </div>
                    <div className="flex gap-6">
                        {/*<button className="bg-white border border-[#3E4DCE] text-[#3E4DCE] rounded-md py-3.5 px-4">*/}
                        {/*    Cancel*/}
                        {/*</button>*/}
                        <button
                            className="bg-[#3E4DCE] text-white rounded-md py-3.5 px-6"
                            onClick={() => handleSave()}
                        >
                            Save
                        </button>
                    </div>
                </section>

                <section className="mt-5 flex justify-center">
                    <div>
                        <table className="bg-white">
                            <thead className="border-b">
                            <tr>
                                <th className="py-2.5 px-5  pr-25">KPI name</th>
                                <th className="py-2.5 px-5">Score</th>
                                <th className="py-2.5 px-5">Description</th>
                                <th className="py-2.5 px-5">Attachment</th>
                                <th className="py-2.5 px-5">Site Count</th>
                                <th className="py-2.5 px-5">Vendor</th>
                                <th className="py-2.5 px-5">System/RF</th>
                                <th className="py-2.5 px-5">Max Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentKpis.map((kpi, index) => (
                                <tr key={index}>
                                    <td className="py-2.5 pl-7 pr-25">{kpi.kpi_name}</td>
                                    <td className="py-2.5 px-5">
                                        <div className={kpi.score || userScores[(currentPage - 1) * itemsPerPage + index] ? "w-12" : "w-12 h-9 rounded border border-[#9CA0C0] overflow-hidden"}>
                                            <input type="number"
                                                   className="w-full h-full border-none outline-none"
                                                   value={userScores[(currentPage - 1) * itemsPerPage + index] || kpi.score}
                                                   // onChange={(e) =>
                                                   //     handleValueChange((currentPage - 1) * itemsPerPage + index, e.target.value)
                                                   // }
                                                   onChange={(e) => handleScoreChange(index, Number(e.target.value))}
                                                   // onKeyDown={(e) => handleInputKeyDown(e, (currentPage - 1) * itemsPerPage + index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-5">
                                        <div onClick={() => handleDescOpen(kpi.description, index)}>
                                            {
                                                kpi.description?
                                                <text className="block max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer">
                                                    { kpi.description}
                                                </text>
                                                : (
                                                <div className="cursor-pointer flex items-center gap-1"   onClick={() => handleDescOpen(kpi.description, index)}>
                                                    <img src="/images/active/add.svg" alt="Add" />
                                                    <p className="text-[#0E20BC]">add</p>
                                                </div>
                                            )}
                                        </div>
                                        {descOpen && (
                                            selectedDescription !=null ? <div className="fixed inset-0 flex items-center justify-center bg-[#404040] bg-opacity-20">
                                                    <div className="bg-white p-8 rounded-md shadow-md w-[489px] h-[490px] flex flex-col justify-between">
                                                        <div className="flex flex-row items-center justify-between mb-[25px]">
                                                            <h2 className="font-[700]">description</h2>
                                                            <img className="cursor-pointer"
                                                                 onClick={() => dispatch(setDescOpen(false))}
                                                                 src="/images/active/close.svg" alt="close" width={24} height={24}/>
                                                        </div>
                                                      <span className="my-[25px] rtl:mr-0 ">
                                                          {
                                                              selectedDescription
                                                          }
                                                      </span>
                                                        <div className="mt-4 flex justify-end">
                                                            <button
                                                                onClick={() => dispatch(setDescOpen(false))}
                                                                className="bg-white border-[1px] border-solid border-[#E0E0E0] text-gray-700 px-4 py-2 rounded-md mr-2"
                                                            >
                                                                Close
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                                : <div className="fixed inset-0 flex items-center justify-center bg-[#404040] bg-opacity-20">
                                                <div className="bg-white p-8 rounded-md shadow-md w-[489px]">
                                                    <div className="flex flex-row items-center justify-between">
                                                         <h2>Add description</h2>
                                                        <img className="cursor-pointer"
                                                             onClick={() => dispatch(setDescOpen(false))}
                                                             src="/images/active/close.svg" alt="close" width={24} height={24}/>
                                                    </div>
                                                    <textarea value={editedDescription}
                                                        onChange={(e) => setEditedDescription(e.target.value)}
                                                        className="mt-4 w-full h-[262px] border border-gray-300 p-2 rounded-md resize-none"
                                                    ></textarea>
                                                    <div className="mt-4 flex justify-end">
                                                        <button
                                                            onClick={() => dispatch(setDescOpen(false))}
                                                            className="bg-white border-[1px] border-solid border-[#E0E0E0] text-gray-700 px-4 py-2 rounded-md mr-2"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleDescSave}
                                                            className="bg-blue-500 text-white px-6 py-2 rounded-md"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-2.5 px-5" onClick={()=>handleAttach(index)}>

                                        <div className="flex items-center gap-1 text-sm cursor-pointer ">

            {/*                                {fileAttachments[index]?.link ? (*/}
            {/*                                    <a href={fileAttachments[index]?.link} target="_blank" rel="noopener noreferrer">*/}
            {/*                                        {fileAttachments[index]?.name || "View Attachment"}*/}
            {/*                                    </a>*/}
            {/*                                ) : (*/}
            {/*                                    <div className="flex items-center gap-1 text-sm cursor-pointer" onClick={() => handleAttach(index)}>*/}
            {/*                                        {fileAttachments[index]?.name ? (*/}
            {/*                                            <img src="/images/active/filetext.svg" alt="attach" width={20} height={20} />*/}
            {/*                                        ) : (*/}
            {/*                                            <img src="/images/active/attach.svg" alt="Attach" width={20} height={20} />*/}
            {/*                                        )}*/}
            {/*                                        <span className={fileAttachments[index]?.name ? "text-[#220202]" : "text-[#0E20BC]"}>*/}
            {/*    {fileAttachments[index]?.name || "Attach"}*/}
            {/*</span>*/}
            {/*                                    </div>*/}
            {/*                                )}*/}

                                            {  kpi.attachment? (
                                            <Link to={kpi.attachment} className="flex flex-row gap-[10px]">
                                                <img src="/images/active/filetext.svg" alt="attach" width={20} height={20} />
                                                {kpi.attachment}
                                            </Link>
                                            ):(fileAttachments[index]?.name ? <img src="/images/active/filetext.svg" alt="attach" width={20} height={20} />:
                                                    <img
                                                        src="/images/active/attach.svg"
                                                        alt="Attach"
                                                        width={20}
                                                        height={20}
                                                    />)}
                                            {
                                                !kpi.attachment &&(
                                                    <span className={fileAttachments[index]?.name?"text-[#220202]":"text-[#0E20BC]"}>
                                                 {fileAttachments[index]?.name || "Attach"}
                                                     </span>
                                                )
                                            }



                                        </div>

                                        {/*<button*/}
                                        {/*    onClick={() => handleAttach(index)}*/}
                                        {/*    className="border-b border-[#3E4DCE] text-[#3E4DCE]"*/}
                                        {/*>*/}
                                        {/*    Attach*/}
                                        {/*</button>*/}
                                        {attachOpen && (
                                            <div>
                                                <div className="bg-white z-50 rounded-md p-6 fixed top-[20%] left-[34%]">
                                                    <div className="flex justify-between mb-4">
                                                        <h2 className="text-[#212121] text-lg font-bold">Attach File</h2>
                                                        <img
                                                            className="cursor-pointer"
                                                            src="/images/active/close.svg"
                                                            alt="Close"
                                                            onClick={() => dispatch(setAttachOpen(false))}
                                                        />
                                                    </div>
                                                    <div
                                                        className="border-dashed border-2 border-[#3E4DCE] rounded-md p-24 flex flex-col items-center cursor-pointer"
                                                        onClick={(e) =>
                                                        {
                                                            e.stopPropagation();
                                                            document.getElementById("fileInput").click()}}>
                                                        <img src="/images/active/upload.svg" alt="Upload" />

                                                        <div className="flex flex-col items-center gap-1 mt-6">
                                                            <p>
                                                                Drag & Drop your File here, or{" "}
                                                                <span className="text-[#3E4DCE] text-lg font-semibold">Browse</span>
                                                            </p>
                                                            <p className="text-sm text-[#9E9E9E]">Supports: CSV, XLS, XLSX
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="fileInput"
                                                            type="file"
                                                            accept=".csv, .xls, .xlsx"
                                                            className="hidden"
                                                            onChange={(e) => handleFileChange(e, selectedRow[selectedRow.length - 1])}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-4 mt-6">
                                                        <button
                                                            className="bg-white border border-[#3E4DCE] text-[#3E4DCE] rounded-md py-3.5 px-4"
                                                            onClick={() => dispatch(setAttachOpen(false))}
                                                        >
                                                            Cancel
                                                        </button>
                                                        {/*<input placeholder="tttr" type="file" onChange={()=>handleFileChange}/>*/}

                                                        <button
                                                            className="bg-[#3E4DCE] text-white rounded-md py-3.5 px-6"
                                                            onClick={handleFileUpload}
                                                            onChange={handleFileChange}
                                                        >
                                                            Upload
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bg-[#404040] fixed w-screen h-screen top-0 left-0 opacity-40"></div>
                                            </div>
                                        )}



                                    </td>
                                    <td className="py-2.5 px-5">{kpi.site_count}</td>
                                    <td className="py-2.5 px-5">{kpi.vendor}</td>
                                    <td className="py-2.5 px-5">{kpi.rf_system}</td>
                                    <td className="py-2.5 px-5">{kpi.max_score}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="mt-5 flex justify-between">
                            <button
                                className="px-3 py-1 mx-1 bg-blue-500 text-white rounded-md"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div>
                              {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                    }`}
                                    onClick={() => goToPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            </div>
                            <button
                                className="px-3 py-1 mx-1 bg-blue-500 text-white rounded-md"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>
                {validationMessage && (
                    <div className="text-center text-red-500 mt-5">{validationMessage}</div>
                )}

            </main>
        </div>
    );
};

export default TableKpis;
