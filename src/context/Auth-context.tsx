import React, {
    SetStateAction,
    Dispatch,
    createContext,
    ReactNode,
    ReactElement,
    useState,
    useContext,
} from "react";

type AuthContextType = {
    user: { [key: string]: any } | null;
    setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("no Context");
    }
    return context
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<null | { [key: string]: any }>(null);

    return <AuthContext.Provider {...props} value={{ user, setUser }} />;
};
export {AuthProvider, useAuth}