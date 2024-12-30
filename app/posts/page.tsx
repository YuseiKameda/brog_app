import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function PostsPage() {
    const { data: posts, error } = await supabase.from('posts').select('*');

    if (error) {
        return <div>Error: {error.message}
        </div>;
    }

    return (
        <div>
            <h2 className='font-bold'>All Posts</h2>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`} className='hover:underline'>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
