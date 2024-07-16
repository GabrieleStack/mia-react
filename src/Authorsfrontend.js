import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AuthorsFrontend() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ nome: '', cognome: '', email: '', datadinascita: '', avatar: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors();
    }, [currentPage]);

    const fetchAuthors = () => {
        const queryParams = new URLSearchParams({
            page: currentPage,
            limit: 2
        });

        fetch(`http://localhost:4000/api/authors?${queryParams}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nella fetch');
                }
                return res.json();
            })
            .then(data => {
                setAuthors(data.authors);
                setTotalPages(data.totalPages);
            })
            .catch(err => {
                console.error('Errore nella richiesta della fetch', err);
            });
    };

    const postAuthor = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/api/authors?page=${currentPage}&limit=2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAuthor)
        })
            .then(res => res.json())
            .then(data => {
                setAuthors(data.authors);
                setTotalPages(data.totalPages);
                setNewAuthor({ nome: '', cognome: '', email: '', datadinascita: '', avatar: '' });
            })
            .catch(err => {
                console.error('Errore nel post dell\'autore', err);
            });
    };

    const deleteAuthor = (_id) => {
        fetch(`http://localhost:4000/api/authors/${_id}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedAuthors = authors.filter(aut => aut._id !== _id);
                setAuthors(updatedAuthors);

                const updatedTotalPages = Math.ceil((authors.length - 1) / 2); // Supponendo che ogni pagina mostri 2 autori
                setTotalPages(updatedTotalPages);
            })
            .catch(err => {
                console.error('Errore nell\'eliminazione', err);
            });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const navigateToBlogPosts = (authorId, postId) => {
        navigate(`/authors/${authorId}/blogPosts/${postId}`); // Naviga alla pagina dei blog posts dell'autore
    }; 

    const placeholders = new Array(2 - authors.length).fill(null);

    return (
        <>
            <div className='contenutoprimotutto'>
                <div className='contenitoreutenti'>
                    <div className='contenutoutenti'>
                        <ul className='utenti'>
                            {authors.map((aut) => (
                                <li key={aut._id}>
                                    <h5>Nome: {aut.nome}</h5>
                                    <h5>Cognome: {aut.cognome}</h5>
                                    <h5>Email: {aut.email}</h5>
                                    <h5>Data di nascita: {aut.datadinascita}</h5>
                                    <button onClick={() => deleteAuthor(aut._id)}>Elimina</button>
                                    <button onClick={() => navigateToBlogPosts(aut._id)}>Visualizza Blog Posts</button>
                                </li>
                            ))}
                            {placeholders.map((_, index) => (
                                <li key={`placeholder-${index}`} className='placeholder'>
                                    <h5>&nbsp;</h5>
                                    <h5>&nbsp;</h5>
                                    <h5>&nbsp;</h5>
                                    <h5>&nbsp;</h5>
                                    <button className='fittizio'>&nbsp;</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='paginazione'>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Precedente</button>
                        <span> Pagina {currentPage} di {totalPages} </span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Successiva</button>
                    </div>
                </div>
            </div>

            <div className='contenutosecondotutto'>
                <div className='contenitore'>
                    <form className='contenuto' onSubmit={postAuthor}>
                        <div className='primidue'>
                            <input className='input' placeholder=' Nome' type='text' value={newAuthor.nome} onChange={(e) => setNewAuthor({ ...newAuthor, nome: e.target.value })} required />
                            <input className='input' placeholder=' Cognome' type='text' value={newAuthor.cognome} onChange={(e) => setNewAuthor({ ...newAuthor, cognome: e.target.value })} required />
                        </div>
                        <div className='secondidue'>
                            <input className='input' placeholder=' Email' type='email' value={newAuthor.email} onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })} required />
                            <input className='input' placeholder=' Data di nascita' type='date' value={newAuthor.datadinascita} onChange={(e) => setNewAuthor({ ...newAuthor, datadinascita: e.target.value })} required />
                        </div>
                        <button className='bottone' type='submit'>clicca</button>
                    </form>
                </div>
            </div>
        </>
    );
}
                                                       