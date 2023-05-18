'use client'

import { useState, useEffect } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
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
                <Card key={game.id} className='games-card'>
                    <Card.Img variant="top" src={game.image} />
                    <Card.Body>
                        <Card.Title>{game.name}</Card.Title>
                        <Card.Text> {game.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{game.category}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="dark" size="sm">Me gusta</Button>
                        <Button variant="primary" size="sm">Editar</Button>
                        <Button onClick={() => deleteGame(game._id)} size="sm">Eliminar</Button>
                    </Card.Body>
                </Card>
            ))}
        </section>
    )
}
