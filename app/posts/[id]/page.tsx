import { supabase } from "@/lib/supabaseClient";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

type Params = {
    params: Promise<{id: string;}>;
};

export default async function PostDetail({ params }: Params) {
    const { id } = await params;

    const { data: post, error } = await supabase.from("posts").select("*").eq("id", id).single();
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl text-bold mb-4">{post.title}</h1>
            <p className="text-gray-700">{post.content}</p>
            <p>Posted on: { new Date(post.created_at).toLocaleString()}</p>
            <div className="flex space-x-4 mt-4">
                <Link href={`/posts/${id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</Link>
            </div>
            <DeleteButton postId={id} />
        </div>
    );
}
