'use client'

import { useState } from "react"
import Header from "./components/Header"

export default function Main() {
    const [textInput, setText] = useState('')

    return (
        <div>
            <Header textInput={textInput} setText={setText} />
            <div>Main Content</div>
        </div>
    )
}