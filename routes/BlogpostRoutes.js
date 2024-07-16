import express from 'express';
import Authors from '../models/Authors.js';

const postRoute = express.Router();

// Rotta per ottenere tutti i blog posts di un autore specifico
postRoute.get('/authors/:authorId/blogPosts', async (req, res) => {
    try {
        const author = await Authors.findById(req.params.authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }
        res.json(author.blogPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per ottenere un singolo blog post di un autore specifico
postRoute.get('/authors/:authorId/blogPosts/:postId', async (req, res) => {
    try {
        const author = await Authors.findById(req.params.authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }
        const post = author.blogPosts.id(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per creare un nuovo blog post per un autore specifico
postRoute.post('/authors/:authorId/blogPosts', async (req, res) => {
    try {
        const author = await Authors.findById(req.params.authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }
        const newPost = {
            category: req.body.category,
            title: req.body.title,
            cover: req.body.cover,
            comments: req.body.comments || []
        };
        author.blogPosts.push(newPost);
        await author.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rotta per eliminare un blog post di un autore specifico
postRoute.delete('/authors/:authorId/blogPosts/:postId', async (req, res) => {
    try {
        const author = await Authors.findById(req.params.authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }

        // Utilizza pull per rimuovere il post dall'array blogPosts
        author.blogPosts.pull(req.params.postId);

        // Salva le modifiche all'autore
        await author.save();

        res.json({ message: 'Post eliminato con successo' });
    } catch (err) {
        console.error('Errore nel delete:', err);
        res.status(500).json({ message: err.message });
    }
});



export default postRoute;
