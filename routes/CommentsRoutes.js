import express, { Router } from "express"
import BlogPosts from "../models/BlogPost.js"

const commentRoute = express.Router()

import express from "express";
import BlogPosts from "../models/BlogPost.js";

const commentRoute = express.Router();

commentRoute.get('/blogPosts/:id/comments', async(req, res) => {
    try {
        const blogPost = await BlogPosts.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post non trovato' });
        }

        const comments = blogPost.comments;

        if (!comments) {
            return res.status(201).json({ message: 'Nessun commento trovato' });
        }

        return res.json(comments);
    } catch (err) {
         res.status(404).json({ message: err.message });
    }
});

commentRoute.get('/blogPosts/:id/comments/commentId', async(req, res) => {
    try {
        const blogPost = await BlogPosts.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post non trovato' });
        }
        const oneComment = blogPost.comments.id(req.params.commentId)
        if (!oneComment) {
            return res.status(404).json({ message: 'Blog post non trovato' });
        } 
        return res.json(oneComment)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

commentRoute.post('/blogPosts/:id', async(req, res) => {
    
})

export default commentRoute;
