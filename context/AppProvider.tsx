import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IContextProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    navigation: string;
}
interface IProps {
    children: React.ReactNode;
}
export const AppContext = createContext<IContextProps>({
    password: "",
    setPassword: () => {},
    loading: true,
    setLoading: () => {},
    navigation: "",
});
const AppProvider: React.FC<IProps> = ({ children }) => {
    const [password, setPassword] = React.useState<string | any>(
        async (): Promise<string> => {
            const response = await AsyncStorage.getItem("auth");
            if (response) {
                setLoading(false);
                setNavigation("Pass");
                return JSON.parse(response);
            } else {
                setLoading(false);
                setNavigation("Welcome");
                return "";
            }
        }
    );

    const [loading, setLoading] = React.useState<boolean>(true);
    const [navigation, setNavigation] = React.useState<string>("Pass");
    return (
        <AppContext.Provider
            value={{ password, setPassword, loading, setLoading, navigation }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
