import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        id_number: "",
        account_number: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newUser = { ...form };

        await fetch("http://localhost:3001/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
        .then(() => {
            setForm({ name: "", id_number: "", account_number: "", password: "" });
            navigate("/login");
        })
        .catch((error) => window.alert("Failed to register: " + error.message));
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={onSubmit}>
                <input type="text" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} placeholder="Full Name" required />
                <input type="text" value={form.id_number} onChange={(e) => updateForm({ id_number: e.target.value })} placeholder="ID Number" required />
                <input type="text" value={form.account_number} onChange={(e) => updateForm({ account_number: e.target.value })} placeholder="Account Number" required />
                <input type="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} placeholder="Password" required />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}