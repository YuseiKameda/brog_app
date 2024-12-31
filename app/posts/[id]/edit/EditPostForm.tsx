"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
};

export default function EditPostForm({ post }: { post: Post }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error.message);
            }
            setUser(session?.user || null);
        };
        fetchSession();
    }, [])

    const isOwner = user?.id === post.user_id;

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from('posts').update({ title, content }).eq('id', post.id);
        if (error) {
            setMessage(`error: ${error.message}`);
        } else {
            setMessage('Post updated successfully!');
            router.push(`/posts/${post.id}`);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl text-bold mb-4">Edit Post</h1>
            {user ? (
                isOwner ? (
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-gray-300 border rounded-md"
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
                    className="border-gray-300 border rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 border rounded-md hover:bg-blue-300">Update</button>
            </form>
                ) : (
                    <p className="text-sm text-gray-500 mt-4">You can view this post, but you are not the owner.</p>
                )
            ) : (
                <p className="text-sm text-gray-500 mt-4">Please log in to edit or delete this post.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}
