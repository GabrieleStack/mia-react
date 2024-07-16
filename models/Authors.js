import { Schema, model } from "mongoose";

// Schema per i commenti
const CommentsSchema = new Schema({
    text: { type: String, required: true },
    valutation: { type: String, required: true }
}, { _id: true });

// Schema per i post del blog
const BlogPostSchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    comments: [CommentsSchema]  // Embedding dei commenti all'interno dei post del blog
});

// Schema per gli autori
const authorSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true },
    datadinascita: { type: String, required: true },
    blogPosts: [BlogPostSchema]  // Embedding dei post del blog all'interno degli autori
}, { collection: 'authors' });

const Authors = model('Authors', authorSchema);

export default Authors;
