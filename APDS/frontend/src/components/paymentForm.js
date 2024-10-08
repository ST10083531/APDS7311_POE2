import React, { useState } from "react";

export default function PaymentForm() {
  const [form, setForm] = useState({
    amount: "",
    currency: "ZAR",
    provider: "SWIFT",
    account_info: "",
    swift_code: ""
  });

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    await fetch("http://localhost:3001/transaction/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form),
    })
      .then(() => setForm({ amount: "", currency: "ZAR", provider: "SWIFT", account_info: "", swift_code: "" }))
      .catch((error) => window.alert("Payment failed: " + error.message));
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center">Make a Payment</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={form.amount}
                    onChange={(e) => updateForm({ amount: e.target.value })}
                    placeholder="Amount"
                    required
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
                    placeholder="Account Info"
                    required
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
                    placeholder="SWIFT Code"
                    required
                  />
                </div>
                <div className="text-center">
                  <input type="submit" value="Pay Now" className="btn btn-success btn-block" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}