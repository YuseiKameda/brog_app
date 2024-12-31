import { supabase } from "@/lib/supabaseClient";
import PostDetailClient from "./PostDetailClient";

type Params = {
    params: Promise<{id: string;}>;
};

export default async function PostDetail({ params }: Params) {
    const { id } = await params;

    // 投稿データを取得
    const { data: post, error } = await supabase.from("posts").select("*").eq("id", id).single();
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return <PostDetailClient post={post} />;
    }
