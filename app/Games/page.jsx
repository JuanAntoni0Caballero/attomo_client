'use client'


import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/auth.context';
import { useState, useEffect } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import Link from 'next/link'
import './games.css'


export default function GamesPage() {



    const { userData } = useContext(AuthContext)

    const isAdmin = userData.role === 'ADMIN'

    const [isLoged, setIsLoged] = useState(false)

    const [games, setGames] = useState([])


    const fetchGames = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getAllGames`);
            const data = await response.json();
            setGames(data);
            console.log('DATA DE GAMES ==> ==> ', data.map(game => game.likesBy))
        }

        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGames();
        // if (userData) {
        //     setIsLoged(true)
        // }
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

        <section className='games-container'>
            {games.map((game) => (
                <Card key={game._id} className='GamesCard'>
                    <Card.Img className='GamesCardImage' variant="top" src={game.image} />

                    <Card.Body className='GamesCard-body'>
                        <Card.Title className='GamesCardTitle'>{game.name}</Card.Title>
                        <p>{game.description}</p>
                    </Card.Body>
                    <Card.Text key={game._id}>{game.likesBy.length} Likes</Card.Text>



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


                </Card>
            ))
            }
        </section >
    )
}
