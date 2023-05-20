'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';

const SignupForm = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            router.push('/Login')
            const data = await response.json();
            console.log(data);
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
                    placeholder="Nombre"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SignupForm;
