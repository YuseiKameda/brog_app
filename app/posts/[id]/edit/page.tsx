import { supabase } from "@/lib/supabaseClient";
import EditPostForm from "./EditPostForm";

type Params = {
    params: Promise<{id: string;}>;
};

export default async function EditPostPage({ params }: Params) {
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
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
        <EditPostForm post={post} />
        </div>
    );
}
