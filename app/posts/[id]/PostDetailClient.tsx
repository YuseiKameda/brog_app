'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { User } from "@supabase/supabase-js";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function PostDetailClient({ post }: { post: Post }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();


      if (error) {
        console.error("Error fetching session:", error.message);
      }

      setUser(session?.user || null);
    };

    fetchSession();
  }, []);

  const isOwner = user?.id === post.user_id;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
      <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>

      {user ? (
        isOwner ? (
          <div className="flex space-x-4 mt-4">
            <Link
              href={`/posts/${post.id}/edit`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </Link>
            <DeleteButton postId={post.id} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">
            You can view this post, but you are not the owner.
          </p>
        )
      ) : (
        <p className="text-sm text-gray-500 mt-4">
          Please log in to edit or delete this post.
        </p>
      )}
    </div>
  );
}
