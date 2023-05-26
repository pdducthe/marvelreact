import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacterList, getCharacterList } from '../../store/reducers';
import { AppDispatch } from '../../store/configStore';
import { Menu } from 'semantic-ui-react';
import { createMedia } from '@artsy/fresnel';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const characterList = useSelector((state: any) => state.characterList);

  const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      sm: 0,
      md: 768,
      lg: 1024,
    },
  })

  const breakpoints = {
    sm:0,
    md:768,
    lg:1024
  }
  return (
    <div>
      <MediaContextProvider>
        <Media at='sm' >
          <HeaderMobile size={breakpoints.sm} />
        </Media>
        <Media greaterThan='sm' >
          <HeaderDesktop size={breakpoints.md}/>
        </Media>
      </MediaContextProvider>
    </div>
  )
}

export default Header