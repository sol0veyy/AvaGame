import React from "react";
import 'https://kit.fontawesome.com/ec79f0a95b.js'
import Header from "../components/Header";
import '../css/style.css'
import MainContent from "../components/MainContent";

const Main = () => {
    return (
        <div style={{height: "100vh"}}>
            <Header />
            <MainContent />
        </div>
    )
}

export default Main;