import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Grid, Image, Segment } from 'semantic-ui-react'
import { AppDispatch } from '../store/configStore'
import { fetchCharacterList, fetchCharacterListById } from '../store/reducers';
import { NavLink } from 'react-router-dom';

function CharacterList() {
  const dispatch = useDispatch<AppDispatch>();
  const characterList = useSelector((state: any) => state.characterSlice.characterList);
  const [imgSrc, setImgSrc] = useState('desktop');
  const [width, setWidth] = useState(window.innerWidth);

  let size: string = ''
  useEffect(() => {
    dispatch(fetchCharacterList());
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize, false);
    if (width < 600) {
      setImgSrc('mobile')
      size = 'standard_small'
    }
    if (width >= 600 && width < 992) {
      setImgSrc('tablet')
      size = 'standard_medium'
    } else {
      setImgSrc('desktop')
      size = 'standard_xlarge'
    }

  }, [window.innerWidth])

  const size_desktop = 'standard_xlarge';
  const size_tablet = 'standard_medium';
  const size_mobile = 'standard_small';

  return (
    <div>
      <Container>
        <Card.Group itemsPerRow={4}>
          {
            characterList.map((item: any) =>
              <Card key={item.id}>
                <Card.Content style={{ padding: '0.5em 0.5em' }}>
                  <Image verticalAlign='middle' size='big' wrapped centered fluid ui={true}
                    src={`${item.thumbnail.path}/${size_desktop}.${item.thumbnail.extension}`}>
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

export default CharacterList