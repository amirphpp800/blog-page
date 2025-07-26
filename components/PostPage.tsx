import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from './BlogPost';
import { UI_TEXT } from '../constants';
import type { Post } from '../types';

interface PostPageProps {
    posts: Post[];
}

export const PostPage: React.FC<PostPageProps> = ({ posts }) => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find(p => p.id.toString() === id);

    if (!post) {
        return <div className="text-center py-10">پست مورد نظر یافت نشد.</div>;
    }

    return (
        <div>
            <Link to="/" className="inline-block mb-4 text-accent-dark hover:underline font-bold">
                &larr; {UI_TEXT.backToHome}
            </Link>
            <BlogPost post={post} />
        </div>
    );
};