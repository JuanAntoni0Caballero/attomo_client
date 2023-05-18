'use client'
import { Container, Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link';
import './Navigation.css'

function Navigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid className='nav-container'>
                <Link href="/">Game Score Hub</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link href="/Signup">Signup</Link>
                        <Link href="/Login" >LogIn </Link>
                        <Link href="/Contact" >Contacto </Link>
                        <Link href="/AdminAcces" >Administración </Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;