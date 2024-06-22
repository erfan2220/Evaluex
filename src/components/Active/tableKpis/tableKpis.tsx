//@ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
    setKpis,
    setAttachOpen,
    setDescOpen,
    updateKpiDescription,
} from "../../../features/tableKpisSlice.ts";
import { useLocation } from "react-router-dom";

const TableKpis = () => {
    const location = useLocation();
    const { selectedName } = location.state || { selectedName: "" };

    const dispatch = useDispatch();
    const kpis = useSelector((state) => state.tableKpis.kpis);
    const attachOpen = useSelector((state) => state.tableKpis.attachOpen);
    const descOpen = useSelector((state) => state.tableKpis.descOpen);

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentDescription, setCurrentDescription] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://192.168.129.209:5001/api/scores_list/",
                    { event_id: 2 } // Data to be sent in the request body
                );
                dispatch(setKpis(response.data)); // Assuming response.data is an array of KPI objects
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAttach = () => {
        dispatch(setAttachOpen(!attachOpen));
    };

    const handleDescOpen = (description, index) => {
        setCurrentDescription(description);
        setEditedDescription(description);
        setSelectedRow(index);
        dispatch(setDescOpen(true));
    };

    const handleDescSave = () => {
        dispatch(
            updateKpiDescription({
                index: selectedRow,
                description: editedDescription,
            })
        );
        dispatch(setDescOpen(false));
    };

    const handleInputChange = (index, field, value) => {
        const updatedKpis = [...kpis];
        updatedKpis[index][field] = value;

        // Perform validation: Ensure score is within maxScore bounds
        const { score, maxScore } = updatedKpis[index];
        if (Number(score) > Number(maxScore)) {
            alert("Score cannot exceed Max Score.");
            // Reset the score to its previous value or handle as needed
            updatedKpis[index][field] = ""; // Resetting to empty string for example
        }

        dispatch(setKpis(updatedKpis));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post("your-api-endpoint", kpis[selectedRow]);
            console.log(response.data);
        } catch (error) {
            console.error("Error saving KPI data:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("your-file-upload-endpoint", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            // Handle the response as needed
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <header className="bg-[#131423] w-full h-20 py-6 px-14 flex justify-between items-center">
                <h3 className="text-2xl text-white opacity-80">Evalue X</h3>
                <div className="flex gap-6">
                    <img src="/images/dashboard/Gear.svg" alt="Settings" width={32} height={32} />
                    <img src="/images/dashboard/user.svg" alt="User" width={32} height={32} />
                </div>
            </header>
            <main className="bg-[#F8F9FB] h-screen">
                <section className="table-kpi-header flex items-center justify-between pt-10 mx-14">
                    <div className="flex flex-col gap-2.5">
                        <h2>{selectedName}</h2>
                        <span className="text-lg text-[#212121] opacity-50">Tehran</span>
                    </div>
                    <div className="flex gap-6">
                        <button className="bg-white border border-[#3E4DCE] text-[#3E4DCE] rounded-md py-3.5 px-4">
                            Cancel
                        </button>
                        <button
                            className="bg-[#3E4DCE] text-white rounded-md py-3.5 px-6"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </section>

                <section className="mt-5 flex justify-center">
                    <table className="bg-white">
                        <thead className="border-b">
                        <tr>
                            <th className="py-2.5 pl-14 pr-25">KPI name</th>
                            <th className="p-2.5">Score</th>
                            <th className="p-2.5">Description</th>
                            <th className="p-2.5">Attachment</th>
                            <th className="p-2.5">Site Count</th>
                            <th className="p-2.5">Vendor</th>
                            <th className="p-2.5">System/RF</th>
                            <th className="p-2.5">Max Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {kpis.map((kpi, index) => (
                            <tr key={index}>
                                <td className="py-2.5 pl-14 pr-25">{kpi.kpi_name}</td>
                                <td className="p-2.5">
                                    <div className="w-12 h-9 rounded border border-[#9CA0C0] overflow-hidden">
                                        <input
                                            type="text"
                                            className="w-full h-full border-none outline-none"
                                            value={kpi.score}
                                            onChange={(e) =>
                                                handleInputChange(index, "score", e.target.value)
                                            }
                                        />
                                    </div>
                                </td>
                                <td
                                    className="p-2.5 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap"
                                    style={{ maxWidth: "150px" }}
                                    onClick={() => handleDescOpen(kpi.description, index)}
                                >
                                    {kpi.description || (
                                        <div className="flex items-center gap-1">
                                            <img src="/images/active/add.svg" alt="Add" />
                                            <p className="text-[#0E20BC]">add</p>
                                        </div>
                                    )}
                                </td>
                                <td className="p-2.5 cursor-pointer" onClick={handleAttach}>
                                    <div className="flex items-center gap-1 text-sm text-[#0E20BC]">
                                        <img
                                            src="/images/active/attach.svg"
                                            alt="Attach"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Attach</span>
                                    </div>
                                </td>
                                <td className="p-2.5 font-montserrat">{kpi.site_count}</td>
                                <td className="p-2.5">{kpi.vendor}</td>
                                <td className="p-2.5">{kpi.rf_system}</td>
                                <td className="p-2.5">{kpi.max_score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                {attachOpen && (
                    <div>
                        <div className="bg-white z-50 rounded-md p-6 fixed top-[30%] left-[34%]">
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
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                <img src="/images/active/upload.svg" alt="Upload" />
                                <div className="flex flex-col items-center gap-1 mt-6">
                                    <p>
                                        Drag & Drop your File here, or{" "}
                                        <span className="text-[#3E4DCE] text-lg font-semibold">Browse</span>
                                    </p>
                                    <p className="text-sm text-[#9E9E9E]">Supports:                                        Supports: CSV, XLS, XLSX
                                    </p>
                                </div>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".csv, .xls, .xlsx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="bg-white border border-[#3E4DCE] text-[#3E4DCE] rounded-md py-3.5 px-4"
                                    onClick={() => dispatch(setAttachOpen(false))}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#3E4DCE] text-white rounded-md py-3.5 px-6"
                                    onClick={handleFileUpload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#404040] fixed w-screen h-screen top-0 left-0 opacity-40"></div>
                    </div>
                )}

                {descOpen && (
                    <div>
                        <div className="bg-white z-50 rounded-md p-6 fixed top-[30%] left-[34%] w-[537px] ">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-[#212121] text-lg font-bold">Edit Description</h2>
                                <img
                                    className="cursor-pointer"
                                    src="/images/active/close.svg"
                                    alt="Close"
                                    onClick={() => dispatch(setDescOpen(false))}
                                />
                            </div>
                            <textarea
                                className="w-full  border border-[#3E4DCE] rounded-md p-2 h-[262px]"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="bg-white border border-[#3E4DCE] text-[#3E4DCE] rounded-md py-3.5 px-4"
                                    onClick={() => dispatch(setDescOpen(false))}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#3E4DCE] text-white rounded-md py-3.5 px-6"
                                    onClick={handleDescSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#404040] fixed w-screen h-screen top-0 left-0 opacity-40"></div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TableKpis;

