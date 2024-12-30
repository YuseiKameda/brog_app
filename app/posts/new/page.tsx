"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setMessage('You must be logged in to create a post');
            return;
        }

        const { error } = await supabase.from('posts').insert([
            {
                title,
                content,
                user_id: user.id,
            },
        ]);

        if (error) {
            setMessage(`error: ${error.message}`);
        } else {
            setMessage('Post created successfully!');
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border-gray-300 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-2 border-gray-300 border rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 border rounded-md hover:bg-blue-300">Create Post</button>
            </form>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
    );
}
