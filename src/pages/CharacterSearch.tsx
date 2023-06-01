import React, { useEffect, useRef, useState } from 'react'
import SearchComponent from '../components/organisms/SearchComponent'
import { Button, Card, Container, Image, Message, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { fetchCharacterListById, fetchCharacterSearch, } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, store } from '../store/configStore'

function CharacterSearch() {
  const dispatch = useDispatch<AppDispatch>();
  let characterSearch = useSelector((state: any) => state.characterSearchSlice.searchList);
  let offsetStore = useSelector((state: any) => state.characterSearchSlice.offset);
  let characterTotal = useSelector((state: any) => state.characterSearchSlice.searchTotal);
  const [width, setWidth] = useState(window.innerWidth);
  const [offset, setOffset] = useState(0);
  const [fullResult, setFullResult] = useState(false);
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    console.log("offsetStore", offsetStore)
  })
  let size_desktop = 'standard_xlarge';
  const sizeRef = useRef(size_desktop);

  const loadMore = () => {
    if (characterTotal > characterSearch.length && offsetStore === 0) {
      setOffset(prePage => prePage + 20) //20 is limit charater per page from API Marvel
    } else if (offsetStore === 0) {
      setOffset(0);
    }
    console.log("offset at Click", offsetStore)
  }

  useEffect(() => {
    if (characterTotal === characterSearch?.length && characterTotal > 0) {
      setFullResult(true)
    }
    if (characterSearch?.length > 0) {
      setDisplay('')
    }
  }, [characterSearch])

  let searchInput = localStorage.getItem("searchInput"); //get value from input search from local storage
  useEffect(() => {
    store.dispatch(fetchCharacterSearch({ name: searchInput, offset: offset }))
  }, [offset])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize, false)
    if (width > 992) {
      sizeRef.current = 'standard_xlarge'
    }
    if (width >= 600 && width < 992) {
      sizeRef.current = 'standard_large'
    } if (width < 600) {
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
                    src={`${item?.thumbnail.path}/${sizeRef.current}.${item.thumbnail.extension}`}>
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
        {
          false ? (
            <>
              <Segment textAlign='center' style={{ display: `none` }}>
                <Message.Header style={{ color: 'aquamarine' }}>All data have been loaded</Message.Header>
                <p style={{ fontStyle: 'italic' }}>Did you find your desired information?</p>
              </Segment>
            </>
          ) : (
            <Segment inverted textAlign='center' style={{ display: '' }}>
              <Button onClick={loadMore}>Load More</Button>
            </Segment>
          )
        }
      </Container>
    </div>
  )
}

export default CharacterSearch