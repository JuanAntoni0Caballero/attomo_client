'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import ErrorsForm from '../components/ErrorsForm/ErrorsForm';
import './gameCreate.css'

const CreateGame = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);


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
            if (response.ok) {
                router.push('/')
                const data = await response.json();
            } else {
                const errorData = await response.json();
                setErrors(errorData.errorMessages)
            }
        } catch (err) {
            console.error(err);
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
            <hr />

            {errors?.length > 0 && <ErrorsForm>{errors.map(elm => <p key={elm._id}>{elm}</p>)}</ErrorsForm>}
        </div >
    );
};

export default CreateGame;
