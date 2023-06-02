import React, { useEffect, useRef, useState } from 'react'
import SearchComponent from '../components/organisms/SearchComponent'
import { Button, Card, Container, Image, Message, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { fetchCharacterListById, fetchCharacterSearch, getCharacterSearch, } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, store } from '../store/configStore'
import { off } from 'process'

function CharacterSearch() {
  const dispatch = useDispatch<AppDispatch>();
  let searchResult = useSelector((state: any) => state.characterSearchSlice.searchResult);
  let stateStore = useSelector((state: any) => state.characterSearchSlice);
  let resetOffset = useSelector((state: any) => state.characterSearchSlice.resetOffset);
  let characterTotal = useSelector((state: any) => state.characterSearchSlice.searchTotal);
  const [width, setWidth] = useState(window.innerWidth);
  const [offset, setOffset] = useState(0);
  const [fullResult, setFullResult] = useState(false);
  const [display, setDisplay] = useState(false);

  let size_desktop = 'standard_xlarge';
  const sizeRef = useRef(size_desktop);

  const loadMore = () => {
    if (characterTotal > searchResult.length && !resetOffset) {
      setOffset(prePage => prePage + 20) //20 is limit charater per page from API Marvel
    }
  }


  useEffect(() => {
    if (resetOffset) {
      //reset sending offset to 0 so LoadMore button will start counting offset from 0, not from the previous offset of previous query input
      store.dispatch(getCharacterSearch({ list: [], reset: false }))
      setOffset(0)
    }
  }, [resetOffset])

  useEffect(() => {
    if (characterTotal === searchResult?.length && characterTotal > 0) {
      setFullResult(true)
    }
    if (searchResult?.length > 0) {
      setDisplay(true)
      console.log("searchResult", searchResult.length)
      console.log("load more button", display)
    }
  }, [searchResult])

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
            searchResult?.map((item: any) =>
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

        {/* <Segment textAlign='center' style={{ display: `none` }}>
                <Message.Header style={{ color: 'aquamarine' }}>All data have been loaded</Message.Header>
                <p style={{ fontStyle: 'italic' }}>Did you find your desired information?</p>
              </Segment> */}

        {display && (
          <Segment inverted textAlign='center'>
            <Button onClick={loadMore}>Load More</Button>
          </Segment>
        )
        }



      </Container>
    </div>
  )
}

export default CharacterSearch