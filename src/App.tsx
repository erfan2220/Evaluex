//@ts-nocheck
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import { createContext, useContext, useState, Suspense } from "react";
import React from "react";
import TableKpis from "./components/Active/tableKpis/tableKpis.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";



const Dashboard = React.lazy(() => import('./Pages/dashboard/dashboard.tsx'));
const ProvinceSelector = React.lazy(() => import('./components/Active/ProvinceSelectorActive/provinceSelector.tsx'));
const KpiSelector = React.lazy(() => import('./components/Active/KpiSelector/kpiSelector'));
const UploadPage = React.lazy(() => import('./components/Active/UploadPageData/uploadPage.tsx'));
const KpiArchive = React.lazy(() => import('./components/Archive/kpiArchive/kpiArchive.tsx'));
const ShowData = React.lazy(() => import('./components/Archive/showData/showData.tsx'));


// Create a context
const SelectedNameContext = createContext();



const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="mx-[56px] mt-[40px] ">
                <Outlet />
            </div>
        </>
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
                        <Route
                            index
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Dashboard />
                                </Suspense>
                            }
                        />


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
                            path="/kpiArchive"
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <KpiArchive />
                                </Suspense>
                            }
                        />



                    </Route>



                    <Route
                        path="/tableKpis"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <TableKpis />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/upload"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <UploadPage />
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
                </Routes>
            </BrowserRouter>
            </Provider>
        </SelectedNameContext.Provider>
    );
}

export default App;
export { SelectedNameContext }; // Export the context to use in other files

