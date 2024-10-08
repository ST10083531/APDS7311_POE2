import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Register() {
    const [form, setForm] = useState({
        name: "",
        password: "",
    });
    const navigate = useNavigate();
    //These methods will update state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }
    //This function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();
        
        //When a post request is sent to the create url, we will create a new user in the database
        const newPerson = {...form};

        await fetch("http://localhost:3001/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        
        setForm({name: "", password: ""});
        navigate("/");
    }
        //The follwing section will display the form that takes input from the user
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
