import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Button, Container, Header, Menu, Segment } from 'semantic-ui-react';
import SearchComponent from './SearchComponent';

function HeaderDesktop() {
    const [header, setHeader] = useState('Welcome to the World of Comic Characters');
    const [tabSearch, setTabSearh] = useState(false);
    const path = useLocation();
    useEffect(() => {
        if (path.pathname.includes("detail")) {
            setHeader("Character Marvel")
        }
        if (path.pathname.includes("search")) {
            setTabSearh(true)
        }
    }, [path.pathname])

    return (
        <div>
            <Segment inverted textAlign='center' style={{ minHeight: '40vh' }} vertical>
                <Menu size='large' inverted secondary>
                    <Container>
                        <Menu.Item as='a' active href='/'>Home</Menu.Item>
                        <Menu.Item as='a'>About</Menu.Item>
                        <Menu.Item as='a' href='/search'>
                            Search
                        </Menu.Item>
                        {tabSearch ? (
                            <Menu.Item>
                                <SearchComponent></SearchComponent>
                            </Menu.Item>
                        ) : (
                            <></>
                        )
                        }
                        <Menu.Item position='right'>
                            <Button as='a' inverted>Log In</Button>
                            <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
                <Segment placeholder inverted vertical textAlign='center'>
                    <Header as='h1' style={{ textTransform: 'uppercase', fontSize: '2.5em' }} content={header} inverted >
                    </Header>
                </Segment>
            </Segment>
        </div>
    )
}

export default HeaderDesktop