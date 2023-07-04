'use client'
import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/auth.context';
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link';
import './Navigation.css'

function Navigation() {

    const { userData, logout } = useContext(AuthContext)

    const isAdmin = userData.role === 'ADMIN'


    const isLogin = () => {
        return !!userData
    }

    const toLogOut = () => {
        logout()
    }

    return (
        <Navbar expand="lg" className="Nav-bar">
            <Container fluid >
                <Link className='Nav-bar-link' href="/">Game Score Hub</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className='Nav-bar-link' href="/Signup">Registrate</Link>

                        {
                            isLogin()

                                ?
                                (
                                    <Link href={'/'} onClick={toLogOut} className='Nav-bar-link'>Cierra Sesión</Link>
                                )
                                :
                                (
                                    <Link className='Nav-bar-link' href="/Login" >Accede </Link>
                                )
                        }

                        {
                            isLogin() &&
                            <Navbar.Brand className='Nav-bar-welcome'> Bienvenido!! {userData.username}</Navbar.Brand>
                        }

                        {isAdmin && <Link className='Nav-bar-link' href="/gameCreate" >Creación de Juegos </Link>}
                    </Nav>
                    <Link className='Nav-bar-link' href="/Contact" >Contacto </Link>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation;