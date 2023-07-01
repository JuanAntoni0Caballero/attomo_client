'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import './gameCreate.css'

const CreateGame = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/createGame`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    category,
                    description,
                    image
                }),
            });
            router.push('/')
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container-Create-Form'>

            <h1>Aquí puedes crear un nuevo juego!</h1>
            <hr className='hr-Create-Form' />

            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <hr />
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Categoria</Form.Label>
                    <hr />
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <hr />
                    <textarea className='textarea' name='textarea' type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    > </textarea>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Añade una imagen</Form.Label>
                    <hr />
                    <Form.Control
                        type="text"
                        placeholder='URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        </div >
    );
};

export default CreateGame;
