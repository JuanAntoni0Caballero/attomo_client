'use client'

import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

function Navigation() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Game Score Hub</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link href="/SignupForm">Signup</Link>
                    <Link href="/dashboard">LogIn</Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;