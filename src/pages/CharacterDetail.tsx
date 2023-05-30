import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { Container, Dimmer, Icon, Image, Item, Label, List, Loader, Segment, SegmentGroup } from 'semantic-ui-react'
import { AppDispatch } from '../store/configStore';
import { fetchCharacterList, fetchCharacterListById } from '../store/reducers';

function CharacterDetail() {
  let { characterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [clickLike, setClickLike] = useState(false);
  const [clickBuy, setClickBuy] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const data = useSelector((state: any) => state.characterIdSlice?.characterInfo);
  const info = data.find((ele: any) => ele !== undefined);
  let size_desktop = 'standard_xlarge';
  const sizeRef = useRef(size_desktop);
  const loading = useSelector((state: any) => state.characterSlice.status)

  useEffect(() => {
    dispatch(fetchCharacterListById(characterId))
  }, [characterId])
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize, false);
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
      {loading === 'loading' && (
        <>
          <Loader active inline='centered' inverted content='Loading' size='big'></Loader>
        </>
      )}
      {
      <Container>
        <Segment style={{ border: '0.15px solid #3c3939', backgroundColor: '#1b1c1d' }}>
          <Item className='items'>
            <Item.Image src={`${info?.thumbnail.path}/${sizeRef.current}.${info?.thumbnail.extension}`} />
            <Item.Content verticalAlign='middle' style={{ color: 'white' }}>
              <Item.Header as='h1' className='itemHeader'>{info?.name}</Item.Header>
              <Item.Meta style={{ marginBottom: '1em' }}>
                <List >
                  <List.Item as='a' className='itemContent' style={{ fontSize: '1.1em' }}>Comics: <span className='qtyColor'>{info?.comics.available}</span> </List.Item>
                  <List.Item as='a' className='itemContent' style={{ fontSize: '1.1em' }}>Series: <span className='qtyColor'>{info?.series.available}</span></List.Item>
                  <List.Item as='a' className='itemContent' style={{ fontSize: '1.1em' }}>Stories: <span className='qtyColor'>{info?.stories.available}</span> </List.Item>
                </List>
              </Item.Meta>
              <Item.Description className='itemDescription'>
                {info?.description}
              </Item.Description>
              <Item.Extra style={{ margin: '1em 0', cursor: 'pointer', display: 'flex', gap: '1.5em' }}>
                <Icon name='like' style={{ color: clickLike ? 'red' : 'white', }} className='itemIcon' onClick={() => clickLike ? setClickLike(false) : setClickLike(true)}></Icon>
                <Icon name='add to cart' style={{ color: clickBuy ? 'green' : 'white', }} onClick={() => clickBuy ? setClickBuy(false) : setClickBuy(true)} className='itemIcon'></Icon>
                <Icon></Icon>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
      </Container>

      }
    </div >
  )
}

export default CharacterDetail