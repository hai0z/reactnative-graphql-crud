import React, { ReactNode, useContext, Fragment } from "react";
import { AppContext } from "../context/AppProvider";
interface IProps {
    children: ReactNode | undefined | any;
}
const Loading = ({ children }: IProps) => {
    const { loading, password } = useContext(AppContext);
    console.log(loading, password);
    return loading ? <Fragment /> : children;
};

export default Loading;
