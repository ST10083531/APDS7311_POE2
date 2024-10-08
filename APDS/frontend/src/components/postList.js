import React, { useEffect, useState } from "react";

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            // Make sure this URL matches the port your backend is running on
            const response = await fetch("http://localhost:3001/post/");
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const posts = await response.json();
            setPosts(posts);
        }

        getPosts();
    }, [posts.length]);

    return (
        <div>
            <h3>Post List</h3>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
}