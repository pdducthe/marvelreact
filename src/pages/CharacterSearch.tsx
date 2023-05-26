import React, { useEffect, useRef, useState } from 'react'
import SearchComponent from '../components/organisms/SearchComponent'
import { Button, Card, Container, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { fetchCharacterList, fetchCharacterListById } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/configStore'

function CharacterSearch() {
  const dispatch = useDispatch<AppDispatch>();
  let characterSearch = useSelector((state:any)=>state.characterSearchSlice.searchList)
  const [width, setWidth] = useState(window.innerWidth);
  
  let size_desktop = 'standard_xlarge';
  const sizeRef = useRef(size_desktop);
  useEffect(() => {
    const handleResize = ()=>{
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize',handleResize,false)
    if (width > 992) {
      sizeRef.current = 'standard_xlarge'
    }
    if (width >= 600 && width < 992) {
      sizeRef.current = 'standard_large'
    } if(width < 600){
      sizeRef.current = 'standard_medium'
    }
  }, [width])

  return (
    <div>
      <Container>
        <Card.Group itemsPerRow={4}>
          {
            characterSearch?.map((item: any) =>
              <Card key={item.id}>
                <Card.Content style={{ padding: '0.5em 0.5em' }}>
                  <Image verticalAlign='middle' wrapped centered fluid ui={true}
                    src={`${item.thumbnail.path}/${sizeRef.current}.${item.thumbnail.extension}`}>
                  </Image>
                  <Card.Header textAlign='center' className='characterText' style={{ marginTop: '0.5rem' }}>{item?.name}</Card.Header>
                </Card.Content>
                <Card.Content extra textAlign='center' className='characterSubText'>
                  <NavLink to={`detail/${item?.id}`}>
                    <Button onClick={() => dispatch(fetchCharacterListById(item?.id))}>
                      Read more
                    </Button>
                  </NavLink>
                </Card.Content>
              </Card>
            )
          }
        </Card.Group>
      </Container>
    </div>
  )
}

export default CharacterSearch