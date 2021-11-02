import React, { ReactElement } from "react";

import { AppBootstrap } from "@components";
import Nav from "@config/nav";
import { SettingsProvider } from "@context/Settings-context";
import { AuthProvider } from "@context/Auth-context";
import Amplify from "@aws-amplify/core";

import config from "../aws-exports";

Amplify.configure(config);

export default function App(): ReactElement {
    return (
        <AuthProvider>
            <AppBootstrap>
                <SettingsProvider>
                    <Nav />
                </SettingsProvider>
            </AppBootstrap>
        </AuthProvider>
    );
}
