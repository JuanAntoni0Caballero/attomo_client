'use client'

import { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default function GamesPage() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5005/api/games/getAllGames')
                const data = await response.json()
                setGames(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchGames()
    }, [])

    return (
        <section>
            {games.map((game) => (
                <Card key={game.id} style={{ width: '18rem' }}>
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
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                // <article key={game.id}>
                //     <h2>{game.name}</h2>
                //     <p>{game.category}</p>
                // </article>
            ))}
        </section>
    )
}
