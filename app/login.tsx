import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function register() {
        alert(`Creating account with ${email} and ${password}`);
    }

    return (
        <div>
            <h1>Atlas</h1>
            <p>School</p>
            <div>
                <h2>
                    Sign in with Github
                </h2>
            </div>
        </div>
    )
}