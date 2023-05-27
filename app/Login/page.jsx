'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form } from 'react-bootstrap'
import './login.css'

const SignupForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await response.json()

            if (response.ok) {
                router.push('/')
            } else {
                console.error('Error:', data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        // <Form onSubmit={handleFormSubmit}>
        //     <Form.Group className="mb-3" controlId="formBasicEmail">
        //         <Form.Label>Correo electrónico</Form.Label>
        //         <Form.Control
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />
        //     </Form.Group>
        //     <Form.Group className="mb-3" controlId="formBasicPassword">
        //         <Form.Label>Contraseña</Form.Label>
        //         <Form.Control
        //             type="password"
        //             placeholder="Contraseña"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //     </Form.Group>
        //     <Button variant="dark" type="submit">
        //         Submit
        //     </Button>
        // </Form>

        <div className='container-Login-Form'>

            <h1>Bienvenido de nuevo a Game Score Hub!!!</h1>
            <hr className='hr-Login-Form' />
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="Form-group" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <hr />
                    <Form.Control className='Login-Form-control'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="Form-group" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <hr />
                    <Form.Control className='Login-Form-control'
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className='Login-Form-button' type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignupForm
