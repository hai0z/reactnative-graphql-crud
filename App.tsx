import React from "react";
import Navigation from "./navigation/index";

import AppProvider from "./context/AppProvider";
import Loading from "./components/loading";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

export default function App() {
    return (
        <ApolloProvider client={client}>
            <AppProvider>
                <Loading>
                    <Navigation />
                </Loading>
            </AppProvider>
        </ApolloProvider>
    );
}
