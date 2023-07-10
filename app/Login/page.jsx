'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import ErrorsForm from '../components/ErrorsForm/ErrorsForm'

import './login.css'

const LoginForm = () => {


    const router = useRouter()
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])



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

            if (response.ok) {
                const responseData = await response.json()
                const authoToken = responseData.authToken
                login(authoToken)
                router.push('/')
            } else {
                const errorData = await response.json()
                setErrors(errorData.errorMessages)
            }
        } catch (error) {
            console.error('ERROR ==> ', error)
        }
    }

    return (
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

            <hr />

            {errors?.length > 0 && <ErrorsForm>{errors.map(elm => <p key={elm._id}>{elm}</p>)}</ErrorsForm>}
        </div>
    )
}

export default LoginForm
