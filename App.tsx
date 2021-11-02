import React from "react";
import Navigation from "./navigation/index";

import AppProvider from "./context/AppProvider";
import Loading from "./components/loading";
export default function App() {
    return (
        <AppProvider>
            <Loading>
                <Navigation />
            </Loading>
        </AppProvider>
    );
}
