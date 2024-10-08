import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function CreatePost() {
    const [form, setForm] = useState({
        user: "",
        content: "",
        image: ""
    });
    const navigate = useNavigate();

    //Retreieve the user from localStorage when the component mounts
    useEffect(() => {
        const savedUser = localStorage.getItem("name"); // Make sure the user is saved in localStorage as a string
        if (savedUser) {
            setForm((prev) => ({
                ...prev,
                user: savedUser,
            }));
        } else {
            // Redirect to login if there is no user
            navigate("/login");
        }
    }, [navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    //Function to handle the form submission
    async function onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwt");

        const newPost = {
            user: form.user,
            content: form.content,
            image: form.image
        };

        try {
            const response = await fetch("https://localhost:3001/post/upload", { //Change to http for local development
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
            setForm({ user: form.user, content: "", image: ""}); //Reset the form but keep user
            navigate("/");
        } catch (error) {
            window.alert(error);
        }
    }

    return (
        <div className="container">
            <h3 className="header">Create New Post</h3>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <input
                    type="text"
                    className="form-control"
                    id="user"
                    value={form.user}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input
                    type="text"
                    className="form-control"
                    id="content"
                    value={form.content}
                    onChange={(e) => updateForm({ content: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="submit"
                    value="Create Post"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}