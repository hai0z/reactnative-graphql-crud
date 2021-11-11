import React, { ReactNode, useContext, Fragment } from "react";
import { AppContext } from "../context/AppProvider";
interface IProps {
    children: ReactNode | undefined | any;
}
const Loading = ({ children }: IProps) => {
    const { loading } = useContext(AppContext);
    return loading ? <Fragment /> : children;
};

export default Loading;
