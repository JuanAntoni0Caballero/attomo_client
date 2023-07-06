'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import ErrorsForm from '../ErrorsForm/ErrorsForm';
import Link from 'next/link';
import('./editForm.css')


const EditForm
    = () => {

        const params = useParams();
        const router = useRouter();

        const [name, setName] = useState('');
        const [category, setCategory] = useState('');
        const [description, setDescription] = useState('');
        const [image, setImage] = useState('');
        const [errors, setErrors] = useState([]);

        const game = params



        useEffect(() => {
            const fetchGames = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getOneGame/${game.id}`);
                    const data = await response.json();
                    setName(data.name);
                    setCategory(data.category);
                    setDescription(data.description);
                    setImage(data.image);

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
                        image,
                    }),
                });
                if (response.ok) {
                    router.push('/')
                    const data = await response.json();
                } else {
                    const errorData = await response.json();
                    setErrors(errorData.errorMessages)
                }
            } catch (error) {
                console.error(error);
            }
        };

        const handleInputChange = async (e) => {
            e.preventDefault()

            try {
                const formData = new FormData()
                formData.append('imageData', e.target.files[0])

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
                    method: 'POST',
                    body: formData
                })

                if (response.ok) {
                    const data = await response.json();
                    setImage(data.cloudinary_url)
                } else {
                    const errorData = await response.json();
                    setErrors(errorData.errorMessages)
                }
            } catch (err) {
                console.error(err);
            }
        }

        return (
            <section className='container-Edit-Form'>
                <h1>Aquí puedes editar el juego!</h1>
                <hr className='hr-Edit-Form' />

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
                    <Form.Group controlId="formBasicCategory">
                        <Form.Label>Categoria</Form.Label>
                        <hr />
                        <Form.Control
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Descripcion</Form.Label>
                        <hr />
                        <textarea className='textarea'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                        <Form.Label>Añade una imagen</Form.Label>
                        <hr />
                        <Form.Control
                            type="file"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <div className='container-Button-Edit-Form'>
                        <Link href='/' className='link-Edit-Form'>Volver</Link>
                        <Button className='button-Edit-Form' type="submit">Editar</Button>
                    </div>
                </Form>

                <hr />

                {errors?.length > 0 && <ErrorsForm>{errors.map(elm => <p key={elm._id}>{elm}</p>)}</ErrorsForm>}
            </section >
        )

    }

export default EditForm
