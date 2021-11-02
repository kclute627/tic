import React, {
    ReactElement,
    ReactNode,
    useState,
    useEffect,
    
} from "react";
import { Auth, Hub } from "aws-amplify";

import {
    useFonts,
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import AppLoading from "expo-app-loading";
import {useAuth} from "@context/Auth-context"

type AppBootstrapProps = {
    children: ReactNode;
};

export default function AppBootstrap({
    children,
}: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        DeliusUnicase_400Regular,
        DeliusUnicase_700Bold,
    });
    const [authLoaded, setAuthLoaded] = useState(false);
    const {setUser} = useAuth()



    const checkAuthUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        } catch (error) {
            setUser(null);
        }
        setAuthLoaded(true);
    };
    function hubListner(hubData : any){

        const {data, event} = hubData.payload

        switch (event) {
            case "signOut":
                setUser(null)
                break;
            case "signIn":
                setUser(data)
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        checkAuthUser();

        Hub.listen('auth', hubListner);

        return ()=>{
            Hub.remove('auth', hubListner)
        }

    }, []);
    return fontLoaded && authLoaded ? (
        <>
            {children}
        </>
    ) : (
        <AppLoading />
    );
}
