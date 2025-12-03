import React, { useEffect } from "react";
import Form from "./Form";

const Dashboard = ({ title, subtitle }) => {

    useEffect(() => {
        console.log("INSIDE USE-EFFECT OF DASHBOARD")
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <Form />
        </div>
    )
}

export default Dashboard;
