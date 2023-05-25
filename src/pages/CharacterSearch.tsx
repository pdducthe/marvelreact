import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log("searchlist",characterSearch)
  }, [])

  const size_desktop = 'standard_xlarge';
  const size_tablet = 'standard_medium';
  const size_mobile = 'standard_small';
  return (
    <div>
      <Container>
        <Card.Group itemsPerRow={4}>
          {
            characterSearch?.map((item: any) =>
              <Card key={item.id}>
                <Card.Content style={{ padding: '0.5em 0.5em' }}>
                  <Image verticalAlign='middle' size='big' wrapped centered fluid ui={true}
                    src={`${item?.thumbnail.path}/${size_desktop}.${item.thumbnail.extension}`}>
                  </Image>
                  <Card.Header textAlign='center' className='characterText' style={{ marginTop: '0.5rem' }}>{item.name}</Card.Header>
                </Card.Content>
                <Card.Content extra textAlign='center' className='characterSubText'>
                  <NavLink to={`detail/${item.id}`}>
                    <Button onClick={() => dispatch(fetchCharacterListById(item.id))}>
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