import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [form, setForm] = useState({
        user: "",
        content: "",
        image: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwt");
        const newPost = { ...form };

        try {
            const response = await fetch("http://localhost:3001/post/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error("Network response was not okay");
            }

            const result = await response.json();
            console.log("Post created:", result);
            setForm({ user: "", content: "", image: "" });
            navigate("/");  // Redirect after post creation
        } catch (error) {
            window.alert(error);
        }
    }

    return (
        <div className="container">
            <h3>Create New Post</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        value={form.content}
                        onChange={(e) => updateForm({ content: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Post" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}