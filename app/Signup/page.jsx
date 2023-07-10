'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form } from 'react-bootstrap'
import './signup.css'



const SignupForm = () => {
    const router = useRouter()
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()

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
            })
            router.push('/Login')
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className='container-Sigunp-Form'>

            <h1>Bienvenido a Game Score Hub!!!</h1>
            <hr className='hr-Sigunp-Form' />

            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="Form-group" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <hr />
                    <Form.Control className='Sigunp-Form-control'
                        type="text"
                        placeholder="Nombre"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="Form-group" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <hr />
                    <Form.Control className='Sigunp-Form-control'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="Form-group" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <hr />
                    <Form.Control className='Sigunp-Form-control'
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className='Sigunp-Form-button' type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignupForm
