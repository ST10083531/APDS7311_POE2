import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        name: "",
        account_number: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        const userCredentials = { ...form };

        await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("jwt", data.token);
            setForm({ name: "", account_number: "", password: "" });
            navigate("/pay");
        })
        .catch((error) => window.alert("Failed to log in: " + error.message));
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <input type="text" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} placeholder="Username" required />
                <input type="text" value={form.account_number} onChange={(e) => updateForm({ account_number: e.target.value })} placeholder="Account Number" required />
                <input type="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} placeholder="Password" required />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}