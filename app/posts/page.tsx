import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default async function PostsPage() {
    const { data: posts, error } = await supabase.from('posts').select('*');

    if (error) {
        return <div>Error: {error.message}
        </div>;
    }

    if (!posts || posts.length === 0) {
        return <div>No posts found</div>;
    }

    return (
        <div className='container mx-auto'>
            <h2 className='font-bold'>All Posts</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {posts?.map((post) => (
                    <div key={post.id} className='bg-white p-4 shadow-md rounded-md'>
                        <Link href={`/posts/${post.id}`}>
                            <Image src={post.image_url || "/default_image.jpeg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className='w-full h-32 object-cover rounded-md' />
                        </Link>
                        <div>
                            <h2>{post.title}</h2>
                            <p>Created on: {new Date(post.created_at).toLocaleString()}</p>
                            <p>Likes: {post.likes}</p>
                            <p>Posted by: {post.user_id}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
