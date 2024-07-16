import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogPostsFrontend() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [newBlogPost, setNewBlogPost] = useState({ category: '', title: '', cover: '' });
    const { authorId } = useParams();

    useEffect(() => {
        if (authorId) {
            fetchBlogPosts();
        }
    }, [authorId]);

    const fetchBlogPosts = () => {
        fetch(`http://localhost:4000/api/authors/${authorId}/blogPosts`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nella fetch dei post');
                }
                return res.json();
            })
            .then(data => {
                console.log('Fetched blog posts:', data);
                setBlogPosts(data);
            })
            .catch(err => {
                console.error('Errore nella fetch', err);
            });
    };

    const postBlogPost = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/api/authors/${authorId}/blogPosts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlogPost)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Errore nel post');
            }
            return res.json();
        })
        .then(newPost => {
            setBlogPosts(prevBlogPosts => [...prevBlogPosts, newPost]);
            setNewBlogPost({ category: '', title: '', cover: '' });
        })
        .catch(err => {
            console.error('Errore', err);
        });
    };

    const deletePost = (postId) => {
        console.log('Deleting post with ID:', postId);
        fetch(`http://localhost:4000/api/authors/${authorId}/blogPosts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedPosts = blogPosts.filter(post => post._id !== postId);
            setBlogPosts(updatedPosts);
        })
        .catch(err => {
            console.error('Errore nell\'eliminazione', err);
        });
    };

    return (
        <div>
            <h2>Lista dei Post</h2>
            {Array.isArray(blogPosts) && (
                <ul>
                    {blogPosts.map(post => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>Categoria: {post.category}</p>
                            <img src={post.cover} alt={post.title} style={{ maxWidth: '100px' }} />
                            <button onClick={() => deletePost(post._id)}>Elimina Post</button>
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={postBlogPost}>
                <input type="text" value={newBlogPost.category} onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value })} required/>
                <input type="text" value={newBlogPost.title} onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value })} required/>
                <input type="text" value={newBlogPost.cover} onChange={(e) => setNewBlogPost({...newBlogPost, cover: e.target.value })} required/>
                <button type="submit">Aggiungi Post</button>
            </form>
        </div>
    );
}
