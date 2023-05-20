'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';


const EditForm
    = () => {

        const params = useParams();
        const router = useRouter();

        const [name, setName] = useState('');
        const [category, setCategory] = useState('');
        const [description, setDescription] = useState('');

        const game = params



        useEffect(() => {
            const fetchGames = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getOneGame/${game.id}`);
                    const data = await response.json();
                    setName(data.name);
                    setCategory(data.category);
                    setDescription(data.description);

                } catch (error) {
                    console.log(error);
                }
            }

            fetchGames()
        }, [game.id])

        const handleFormSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/updateGame/${game.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        category,
                        description,
                    }),
                });
                router.push('/');
                const data = await response.json();
            } catch (error) {
                console.error(error);
            }
        };


        return (
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form >
        )

    }

export default EditForm
