import express from 'express'
import Authors from '../models/Authors.js'

const authorRoute = express.Router()

authorRoute.get('/authors', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    try {
        const authors = await Authors.find({}).skip(skip).limit(limit); // Ordina per data di creazione decrescente o secondo la tua logica
        const totalAuthors = await Authors.countDocuments();
        const totalPages = Math.ceil(totalAuthors / limit);

        res.json({
            authors,
            totalAuthors,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


authorRoute.get('/authors/:id', async(req, res) => {
    try {
        const author = await Authors.findById(req.params.id)
        if(!author) {
            res.status(404).json({message:'autore non trovato'})
        } return res.json(author)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

    authorRoute.post('/authors', async (req, res) => {
        const author = new Authors(req.body);
        try {
            const newAuthor = await author.save();
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 2;
            const skip = (page - 1) * limit;
  
            const authors = await Authors.find({}).skip(skip).limit(limit);
            const totalAuthors = await Authors.countDocuments();
            const totalPages = Math.ceil(totalAuthors / limit);
    
            res.status(201).json({ newAuthor, authors, totalPages });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }); 

authorRoute.delete('/authors/:id', async(req, res) => {
    try {
        await Authors.findByIdAndDelete(req.params.id)
        res.json({message: 'utente eliminato'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export default authorRoute
