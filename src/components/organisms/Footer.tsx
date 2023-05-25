import React from 'react'
import { Container, Grid, GridColumn, GridRow, Header, Icon, List, Segment } from 'semantic-ui-react'

function Footer() {

  return (
    <div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <GridRow centered>
              <GridColumn width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Marvel</List.Item>
                  <List.Item as='a'>Carrers</List.Item>
                  <List.Item as='a'>Internships</List.Item>
                </List>
              </GridColumn>
              <GridColumn width={3}>
                <Header inverted as='h4' content='Partners' />
                <List link inverted>
                  <List.Item as='a'>Disney</List.Item>
                  <List.Item as='a'>Marvelhq.com</List.Item>
                  <List.Item as='a'>Digital Comics</List.Item>
                </List>
              </GridColumn>
              <GridColumn width={3}>
                <Header inverted as='h4' content='Follow' />
                <Grid columns={3}>
                  <Grid.Row>
                    <GridColumn><Icon link name='facebook square' size='large' /></GridColumn>
                    <GridColumn><Icon link name='twitter square' size='large'/></GridColumn>
                    <GridColumn><Icon link name='instagram' size='large' /></GridColumn>
                  </Grid.Row>
                  <Grid.Row>
                    <GridColumn><Icon link name='youtube square' size='large' /></GridColumn>
                    <GridColumn><Icon link name='tumblr square' size='large' /></GridColumn>
                    <GridColumn><Icon link name='telegram' size='large' /></GridColumn>
                  </Grid.Row>
                </Grid>
              </GridColumn>
            </GridRow>
          </Grid>
        </Container>
      </Segment>

    </div>
  )
}

export default Footer