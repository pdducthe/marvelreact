import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, Container, Header, Loader, Menu, Segment } from 'semantic-ui-react';
import SearchComponent from './SearchComponent';
import { useSelector } from 'react-redux';

function HeaderDesktop(size: any) {
    const [header, setHeader] = useState('Welcome to the World of Comic Characters');
    const [tabSearch, setTabSearh] = useState(false);
    const path = useLocation();
    const [activeItem, setActiveItem] = useState('home');
    let location = useLocation();
    let characterSearch = useSelector((state: any) => state.characterSearchSlice.searchList);

    useEffect(() => {
        if (path.pathname.includes("detail")) {
            setHeader("Character Marvel")
        }
        if (path.pathname.includes("search")) {
            setTabSearh(true)
        }
    }, [path.pathname])

    // cannot setState or add/remove class for item as Link
    const handleItemClick = (e: any, { name }: any) => {
        // console.log("e",e.target)
    }

    return (
        <div>
            <Segment inverted textAlign='center' style={{ minHeight: '40vh' }} vertical>
                <Menu size='large' inverted secondary>
                    <Container>
                        <Menu.Item as={Link} name='home' className={location.pathname === '/' ? 'active' : ''} to='/' >Home</Menu.Item>
                        <Menu.Item name='list' as={Link} to='/list/page/1' className={location.pathname.includes('list') ? 'active' : ''} >List</Menu.Item>
                        <Menu.Item name='search' as={Link} to='/search' className={location.pathname.includes('search') ? 'active' : ''}  >
                        </Menu.Item>
                        {tabSearch ? (
                            <Menu.Item>
                                <SearchComponent size={size} data={characterSearch}></SearchComponent>
                            </Menu.Item>
                        ) : (
                            <></>
                        )
                        }
                        <Menu.Item position='right'>
                            <Button as='a' inverted onClick={() => {
                                setActiveItem('dkdkkdke')

                            }}>Log In</Button>
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