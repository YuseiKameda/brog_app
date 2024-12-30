"use client"
import { useParams } from "next/navigation";

export default function PostDetail() {
    const params = useParams() as { id: string };
    const postId = params.id;
    return (
        <div>
            <h2>Post Details</h2>
            <p>Post ID: {postId}</p>
        </div>
    );
}
