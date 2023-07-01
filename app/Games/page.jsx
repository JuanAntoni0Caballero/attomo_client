'use client'


import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/auth.context';
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import './games.css'


export default function GamesPage() {

    const { userData } = useContext(AuthContext)
    const isAdmin = userData.role === 'ADMIN'
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const fetchGames = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getAllGames`);
            const data = await response.json();
            setGames(data);
        }

        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);


    const deleteGame = async (game_id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/deleteGame/${game_id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            fetchGames()
        } catch (error) {
            console.log(error)
        }
    }

    const likeGame = async (game) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/likeGame/${game._id}/${userData._id}`, {
                method: 'POST'
            })
            const data = await response.json()
            if (data) {
                game.likesBy.push({
                    user: userData._id,
                })
            }
            fetchGames()
        } catch (error) {
            console.log(error)

        }
    }

    return (

        <div>

            <section className='games-container'>
                {games.map((game) => (
                    <Card key={game._id} className='GamesCard'>
                        <Card.Img className='GamesCardImage' variant="top" src={game.image} />

                        <Card.Body className='GamesCard-body'>
                            <Card.Title className='GamesCardTitle'>{game.name}</Card.Title>
                            <Card.Text>{game.description}</Card.Text>
                            <Card.Text>{game.category}</Card.Text>
                        </Card.Body>

                        < div className='container-gamesCardButton'>

                            < Button key={game._id} className='buttons-card-game' size="sm" onClick={() => likeGame(game)}>
                                {game.likesBy.some((like) => (like.user === userData._id))
                                    ?
                                    ' No me gusta'
                                    :
                                    '  Me gusta'
                                }
                            </Button>


                            {isAdmin && <Link href={`/EditGame/${game._id}`} passHref>
                                <Button className='buttons-card-game' size="sm">Editar</Button>
                            </Link>}

                            {isAdmin && <Button className='buttons-card-game' onClick={() => deleteGame(game._id)} size="sm">Eliminar</Button>}

                        </div>
                        <div className='container-likes-games'>
                            <Card.Text key={game._id}>{game.likesBy.length}Likes</Card.Text>
                        </div>

                    </Card>
                ))
                }
            </section >

        </div>
    )
}
