import React, { ReactElement } from "react";

import { AppBootstrap } from "@components";
import Nav from "@config/nav";

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <Nav />
        </AppBootstrap>
    );
}
