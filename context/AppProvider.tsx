import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IContextProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IProps {
    children: React.ReactNode;
}
export const AppContext = createContext<IContextProps>({
    password: "",
    setPassword: () => {},
    loading: true,
    setLoading: () => {},
});
const AppProvider = ({ children }: IProps) => {
    const [password, setPassword] = React.useState<string | any>(
        async (): Promise<string> => {
            const response = await AsyncStorage.getItem("auth");
            if (response) {
                setLoading(false);
                return JSON.parse(response);
            } else {
                return "";
            }
        }
    );
    const [loading, setLoading] = React.useState<boolean>(true);
    return (
        <AppContext.Provider
            value={{ password, setPassword, loading, setLoading }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
