import React, {useEffect, createContext, ReactElement, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const difficulty = {
    "1": "Beginner",
    "3": "Intermediate",
    "4": "Hard",
    "-1": "Impossible",
};

type SettingsType = {
    difficulty: keyof typeof difficulty;
    haptics: boolean;
    sounds: boolean;
};

const defaultSettings: SettingsType = {
    difficulty: "-1",
    haptics: true,
    sounds: true,
};

type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    saveSetting: <T extends keyof SettingsType>(settings: T, value: SettingsType[T])=> void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if(!context){
        throw new Error("usesettings must be used inside a provider");
        
    }
    return context;
}
function SettingsProvider(props: {children: ReactNode}): ReactElement {
      const [settings, setSetting] = useState<SettingsType | null>(null);



     const loadSettings = async () => {
         try {
             const settings = await AsyncStorage.getItem("@settings");
             settings !== null
                 ? setSetting(JSON.parse(settings))
                 : setSetting(defaultSettings);
         } catch (error) {
             setSetting(defaultSettings);
         }
     };

     useEffect(() => {
         loadSettings();
     }, []);

     const saveSetting = async <T extends keyof SettingsType>(
         setting: T,
         value: SettingsType[T]
     ) => {
         try {
             const oldSettings = settings ? settings : defaultSettings;

             const newSettings = { ...oldSettings, [setting]: value };
             const jsonSettings = JSON.stringify(newSettings);
             await AsyncStorage.setItem("@settings", jsonSettings);
             setSetting(newSettings);
         } catch (error) {
             alert("Error");
         }
     };




    return (
        <SettingsContext.Provider
        {...props}
            value={{
                settings, saveSetting,loadSettings

            }}
        />
        
    );
}

export { useSettings, SettingsProvider, difficulty };
