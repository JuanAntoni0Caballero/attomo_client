'use client'

import { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import './games.css'

export default function GamesPage() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getAllGames`)
                const data = await response.json()
                setGames(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchGames()
    }, [])

    return (
        <section className='games-container'>
            {games.map((game) => (
                <Card key={game.id} className='games-card'>
                    <Card.Img variant="top" src={game.image} />
                    <Card.Body>
                        <Card.Title>{game.name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{game.category}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Me Gusta</Card.Link>
                    </Card.Body>
                </Card>
            ))}
        </section>
    )
}
