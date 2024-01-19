'use client'

import { useState } from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent/MainContent"

export default function Main() {
    const [textInput, setText] = useState('')

    return (
        <div>
            <Header textInput={textInput} setText={setText} />
            <MainContent textInput={textInput} />
        </div>
    )
}