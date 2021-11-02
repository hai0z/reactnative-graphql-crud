import React, { createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IContextProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IProps {
    children: ReactNode;
}
export const AppContext = createContext<IContextProps>({
    password: "",
    setPassword: () => {},
    loading: true,
    setLoading: () => {},
});
const AppProvider = ({ children }: IProps) => {
    const [password, setPassword] = React.useState<string | any>(async () => {
        const response = await AsyncStorage.getItem("auth");
        if (response) {
            setPassword(JSON.parse(response));
            setLoading(false);
        } else {
            setPassword("");
        }
    });
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
