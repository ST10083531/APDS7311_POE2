import React, { useState } from "react";

export default function PaymentForm() {
    const [form, setForm] = useState({
        amount: "",
        currency: "ZAR",
        provider: "",
        account_info: "",
        swift_code: ""
    });

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwt");

        await fetch("http://localhost:3001/post/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(form),
        })
        .then(response => response.json())
        .then(() => {
            setForm({ amount: "", currency: "ZAR", provider: "", account_info: "", swift_code: "" });
        })
        .catch(error => window.alert(error));
    }

    return (
        <div>
            <h3>Make a Payment</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currency">Currency</label>
                    <select
                        className="form-control"
                        id="currency"
                        value={form.currency}
                        onChange={(e) => updateForm({ currency: e.target.value })}
                    >
                        <option value="ZAR">ZAR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="provider">Provider</label>
                    <input
                        type="text"
                        className="form-control"
                        id="provider"
                        value={form.provider}
                        onChange={(e) => updateForm({ provider: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="account_info">Account Info</label>
                    <input
                        type="text"
                        className="form-control"
                        id="account_info"
                        value={form.account_info}
                        onChange={(e) => updateForm({ account_info: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="swift_code">SWIFT Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="swift_code"
                        value={form.swift_code}
                        onChange={(e) => updateForm({ swift_code: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Pay Now" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}