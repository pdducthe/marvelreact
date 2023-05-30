import React from 'react'
import { useRoutes } from 'react-router-dom'
import CharacterList from '../pages/CharacterList'
import CharacterDetail from '../pages/CharacterDetail'
import CharacterSearch from '../pages/CharacterSearch'
import MainLayout from '../components/layouts/MainLayout'

const Routers = () => {
  const routing = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: 'list/page/:pageId',
          element: <CharacterList/>
        },
        {
          path: 'detail/:characterId',
          element: <CharacterDetail />
        },
        {
          path: 'search',
          element: <CharacterSearch />
        }
      ]
    }
  ])
  return routing
}

export default Routers