'use client'

import { useState, useEffect } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import Link from 'next/link'
import './games.css'

export default function GamesPage() {

    const [games, setGames] = useState([])

    const fetchGames = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getAllGames`);
            const data = await response.json();
            setGames(data);
        } catch (error) {
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
            console.log(data)
            fetchGames()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <section className='games-container'>
            {games.map((game) => (
                <Card className='GamesCard'>
                    <Card.Img className='GamesCardImage' variant="top" src={game.image} />

                    <Card.Body className='GamesCard-body'>
                        <Card.Title className='GamesCardTitle'>{game.name}</Card.Title>
                        <p>{game.description}</p>

                        < div className='container-gamesCardButton'>
                            <Button variant="dark" size="sm">Me gusta</Button>

                            <Link href={`/EditGame/${game._id}`} passHref>
                                <Button variant="primary" size="sm">Editar</Button>
                            </Link>

                            <Button onClick={() => deleteGame(game._id)} size="sm">Eliminar</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))
            }
        </section >
    )
}
