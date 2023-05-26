import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Container, Header, Icon, Menu, Segment, Sidebar, SidebarPushable } from 'semantic-ui-react';
import SearchComponent from './SearchComponent';

function HeaderMobile(size:any) {
  const [sidebarOpened, setSidebarOpended] = useState(false);
  const [header, setHeader] = useState('Welcome to the World of Comic Characters');
  const [tabSearch, setTabSearh] = useState(false);

  const handleToggle = () => {
    setSidebarOpended(true)
  }
  const handleSidebarHide = () => {
    setSidebarOpended(false)
  }

  const path = useLocation()
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
      <Segment inverted style={{ minHeight: '35vh' }}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='overlay' inverted vertical visible={sidebarOpened} onHide={handleSidebarHide}>
            <Menu.Item as='a' active href='/'>Home</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item as='a' href='/search'>Search</Menu.Item>
            <Menu.Item as='a'>Log In</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment inverted vertical textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }}>
              <Container>
                <Menu inverted pointing secondary size='large' style={{ justifyContent:'space-between'}}>
                  <Menu.Item onClick={handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  {true ? (
                    <Menu.Item position='right'>
                      <SearchComponent size={size}></SearchComponent>
                    </Menu.Item>
                  ) : (
                    <></>
                  )}
                  {/* <Menu.Item position='right'>
                    <Button as='a' inverted>Log In</Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item> */}
                </Menu>
              </Container>
              <Segment placeholder inverted vertical textAlign='center'>
                <Header as='h1' style={{ textTransform: 'uppercase', fontSize: '1.5em' }} content={header} inverted >
                </Header>
              </Segment>
            </Segment>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Segment>

    </div>
  )
}

export default HeaderMobile