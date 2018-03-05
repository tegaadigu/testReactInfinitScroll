/**
 * Created by Tega on 04/03/2018.
 */
import React from 'react'
import {Button, Popup, Search, Segment, Header, Icon, Image} from 'semantic-ui-react'

const filters = [
  {
    name: 'price',
    ref: 'price',
    buttons: [
      {
        name: 'high',
        action: 'desc'
      },
      {
        name: 'low',
        action: 'asc'
      }
    ]
  },
  {
    name: 'capacity',
    ref: 'capacity',
    buttons: [
      {
        name: 'Biggest',
        action: 'desc'
      },
      {
        name: 'Smallest',
        action: 'asc'
      }
    ]
  },
  {
    name: 'Size',
    ref: 'square_footage',
    buttons: [
      {
        name: 'Largest',
        action: 'desc'
      },
      {
        name: 'Smallest',
        action: 'asc'
      }
    ]
  }
];

export default class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }

  render() {
    return (
      <div style={{padding: 24}}>
        <Header as='h2' icon textAlign='center'>
          <Icon name='building' circular/>
          <Header.Content>
            The Open Space
          </Header.Content>
        </Header>
        <Segment raised style={{padding: 18, flexDirection: 'row', display: 'flex'}}>
          <div style={{width: '20%'}}>
            <Search
              placeholder="Search Location.."
              loading={this.props.isLoadingSearch}
              onResultSelect={(e, { result }) => this.props.onResultSelect(result)}
              onSearchChange={(e, { value }) => this.props.onSearchChange(value)}
              results={this.props.results}
              value={this.props.value}
              resultRenderer={(object) => {
                return (
                <div style={{display:'flex', flexDirection: 'row'}}>
                    <div>
                      <Image src={object.primary_photo_css_url_small} size='small' circular floated={'left'} />
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>
                       {object.name}
                       </span>
                        <br/>
                      {object.address}
                       <p style={{fontSize: 12, fontWeight: 'bold', color: '#908b8b'}}> from ${object.hourly_price ? object.hourly_price : object.daily_price} CAD per {object.hourly_price ? 'hour' : 'day'} </p>
                    </div>
                </div>)
              }}
            />
          </div>
          <div style={{width: '60%'}}>
            {
              filters.map((item, key) => {
                return (
                  <Popup
                    key={key}
                    trigger={<Button color='teal' size={'small'} content={item.name} />}
                    content={<div>
                    {item.buttons.map((ele, index) => {
                      return (
                         <Button key={index} size={'small'} content={ele.name} onClick={() => this.props.filter(item.ref, ele.action)} />
                      )
                    })}
                    </div>}
                    on='click'
                    position='top right'
                  />
                )
              })
            }
          </div>
          {this.props.showFilter ? <div>
            <Button size={'small'} onClick={this.props.clearFilter} content={'Clear Filter'}/>
          </div> : false}

        </Segment>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}