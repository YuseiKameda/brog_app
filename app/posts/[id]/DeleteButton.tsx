'use client';

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DeleteButton({ postId }: { postId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const { error } = await supabase.from("posts").delete().eq("id", postId);
        if (error) {
        console.error("Error deleting post:", error.message);
        } else {
        router.push("/posts");
        }
    };

    return (
        <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
        Delete
        </button>
    );
}
