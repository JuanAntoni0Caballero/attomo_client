'use client'
import { Container, Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link';
import './Navigation.css'

function Navigation() {
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
                        <Link className='Nav-bar-link' href="/Signup">Signup</Link>
                        <Link className='Nav-bar-link' href="/Login" >LogIn </Link>
                        <Link className='Nav-bar-link' href="/Contact" >Contacto </Link>
                        <Link className='Nav-bar-link' href="/AdminAcces" >Administración </Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Button >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;