import React, { ReactElement } from "react";

import { AppBootstrap } from "@components";
import Nav from "@config/nav";
import {SettingsProvider} from "@context/Settings-context";

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <SettingsProvider >
                <Nav />
            </SettingsProvider>
        </AppBootstrap>
    );
}
