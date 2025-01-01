'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
};

export default function ProfileClient() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchSession = async () => {
        const {
        data: { session },
        error,
        } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error.message);
            setError("Failed to fetch session.");
            return;
        }

        if (!session) {
            setError("You must be logged in to view this page.");
            return;
        }

        setUser(session.user);

        // ユーザーの投稿を取得
        const { data: postsData, error: postsError } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", session.user.id);

        if (postsError) {
            console.error("Error fetching posts:", postsError.message);
            setError("Failed to fetch posts.");
        } else {
            setPosts(postsData);
        }
    };

    fetchSession();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
        {user && (
            <>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">User ID: {user.id}</p>
            </>
        )}
        <h2 className="text-xl font-bold mt-6 mb-4">Your Posts</h2>
        <ul>
            {posts && posts.length > 0 ? (
            posts.map((post) => (
                <li key={post.id} className="mb-4">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-gray-500">
                    Created on: {new Date(post.created_at).toLocaleString()}
                </p>
                <p className="text-gray-700">{post.content}</p>
                </li>
            ))
            ) : (
            <p className="text-gray-500">No posts found.</p>
            )}
        </ul>
        </div>
    );
}
