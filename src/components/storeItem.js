/**
 * Created by Tega on 04/03/2018.
 */
import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class storeItem extends React.Component {
  render () {
    return (
      <Card>
        <Image src={this.props.src} />
        <Card.Content>
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta>
        <span className='date'>
          from ${this.props.price} CAD per {this.props.tag}
        </span>
          </Card.Meta>
          <Card.Description>
            {this.props.address}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='eye' />
            {this.props.views}
          </a>
          <a>
            <Icon name='building' />
            {this.props.square} sq.ft.
          </a>
          <a>
            <Icon name='group' />
            {this.props.capacity}
          </a>
        </Card.Content>
      </Card>
    )
  }
}