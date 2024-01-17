import Main from "./main";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AvaGame',
}

export default function Page() {
    return (
        <div>
            <Main />
        </div>
    )
}