//@ts-nocheck
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import { createContext, useContext, useState, Suspense } from "react";
import React from "react";
import TableKpis from "./components/Active/tableKpis/tableKpis.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import Login from "./components/Auth/login.tsx";



const Dashboard = React.lazy(() => import('./Pages/dashboard/dashboard.tsx'));
const ProvinceSelector = React.lazy(() => import('./components/Active/ProvinceSelectorActive/provinceSelector.tsx'));
const KpiSelector = React.lazy(() => import('./components/Active/KpiSelector/kpiSelector'));
const UploadPage = React.lazy(() => import('./components/Active/UploadPageData/uploadPage.tsx'));
const KpiArchive = React.lazy(() => import('./components/Archive/kpiArchive/kpiArchive.tsx'));
const DataTable = React.lazy(() => import('./components/Archive/finalDataTable/dataTable.tsx'));
const ShowDataArchive= React.lazy(() => import('./components/Province Report/showData/showData.tsx'));
const ChartPage=React.lazy(()=>import('./Pages/ChartPage/chartPage.tsx'))
const ShowData = React.lazy(() => import('./components/Archive/showData/showData.tsx'));
const ArchiveList = React.lazy(() => import('./components/Archive/archivesList/archivesList.tsx'));
const Footer = React.lazy(() => import('./components/Footer/Footer.tsx'));


// Create a context
const SelectedNameContext = createContext();



const Layout = () => {
    return (
        <div className="bg-[#13131D] min-h-[100vh] ">
            <Navbar />
            <div className="mx-[56px] mt-[40px] min-h-[calc(100vh-120px)] overflow-hidden">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

function App() {
    const [selectedActiveName, setSelectedActiveName] = useState("Tehran");

    return (
        <SelectedNameContext.Provider value={{ selectedActiveName, setSelectedActiveName }} >
            <Provider store={store}>
             <BrowserRouter >
                <Routes>

                    <Route path="/" element={<Layout />}>
                        {/*<Route*/}
                        {/*    index*/}
                        {/*    element={*/}
                        {/*        <Suspense fallback={<div>Loading...</div>}>*/}
                        {/*            <Dashboard />*/}
                        {/*        </Suspense>*/}
                        {/*    }*/}
                        {/*/>*/}
                        <Route index element={<Login />} />
                        <Route
                            path="/login"
                            element={<Login/>}/>
                        <Route
                            path="/dashboard"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Dashboard />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/province"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ProvinceSelector />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/dataTable"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DataTable />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/kpiArchive"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <KpiArchive />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/archiveList"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ArchiveList />
                                </Suspense>
                            }
                        />




                        <Route
                            path="/showData"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ShowData />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/chart"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ChartPage />
                                </Suspense>
                            }
                        />




                    </Route>

                    <Route
                        path="/upload"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <UploadPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/tableKpis"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <TableKpis />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/showDataArchive"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <ShowDataArchive />
                            </Suspense>
                        }
                    />

                </Routes>
            </BrowserRouter>
            </Provider>
        </SelectedNameContext.Provider>
    );
}

export default App;
export { SelectedNameContext }; // Export the context to use in other files

