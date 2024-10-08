import React, { useState } from "react";
import { useNavigate } from "react-router";

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

        const newPerson = { ...form };

        await fetch("http://localhost:3001/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPerson),
        })
        .then(() => {
            setForm({ name: "", id_number: "", account_number: "", password: "" });
            navigate("/");
        })
        .catch(error => window.alert(error));
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_number">ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id_number"
                        value={form.id_number}
                        onChange={(e) => updateForm({ id_number: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="account_number">Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="account_number"
                        value={form.account_number}
                        onChange={(e) => updateForm({ account_number: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}