import React from 'react'
import {Image, List} from 'semantic-ui-react'
import MainContainer from 'components/mainContainer'
import Api from 'ApiManager/Api'
import * as constant from 'helper/constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Card, Label} from 'semantic-ui-react'
import StoreItem from 'components/storeItem'
import _ from 'lodash'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      list: [],
      hasMore: true,
      searchValue: '',
      results: [],
      tempList: [],
      isLoadingSearch: false,
      filter: false
    };
    this.total = 1;
    this.api = new Api();
    this.requestListings = this.requestListings.bind(this);
  }

  componentDidMount() {
    this.requestListings()
  }

  resetComponent() {
    this.setState({
      isLoadingSearch: false,
      results: [],
      searchValue: '',
      list: this.state.tempList,
      filter: false,
      hasMore: this.state.page < this.total
    })
  }

  requestListings() {
    if (this.state.page <= this.total && this.state.filter === false) {
      this.api.request(constant.GET, constant.ENDPOINTS.listings, {page: this.state.page}).then(response => {
        this.setState({page: this.state.page + 1});
        let val = {};
        let list = this.state.list;
        response.data.map((item, key) => {
          list.push(item);
        });
        val['list'] = list;
        val['tempList'] = list;
        this.total = Math.floor(response.total / response.page_size);
        val['hasMore'] = this.state.page < this.total;
        this.setState(val);
      })
    } else {
      this.setState({hasMore: false})
    }
  }

  filterList(ref, action) {
    this.setState({filter: true});
    let lists = this.state.list.slice(); //create new array list not point to same array reference.
    var compare = (a, b, action) => {
      return action === 'asc' ? a > b : a < b
    };
    var getRef = (item, ref = 'price') => {
      return ref !== 'price' ? item[ref] : (item['hourly_price'] ? item['hourly_price'] : item['daily_price'])
    };
    lists.sort((a, b) => {
      var firstItem = getRef(a, ref);
      var secondItem = getRef(b, ref);
      if (compare(firstItem, secondItem, action)) {
        return 1;
      }
      else
        return 0;
    });
    this.setState({list: lists});
  }

  render() {
    return (
      <MainContainer
        filter={(ref, action) => this.filterList(ref, action)}
        isLoadingSearch={this.state.isLoadingSearch}
        showFilter={this.state.filter}
        clearFilter={() => this.resetComponent()}
        onSearchChange={(value) => {
          this.setState({isLoadingSearch: true, searchValue: value})
           setTimeout(() => {
                if (this.state.searchValue.length < 1) return this.resetComponent()
                const re = new RegExp(_.escapeRegExp(value), 'gi');
                const isMatch =  (result) => {return re.test(result.address)}
                this.setState({
                  isLoadingSearch: false,
                  results: _.filter(this.state.list, isMatch),
                })
           }, 500)
        }}
        onResultSelect={(result) => {
            this.setState({searchValue: result.name, list: [result], filter: true})
        }}
        results={this.state.results}
        value={this.state.searchValue}
      >
        <InfiniteScroll
          style={{overflow: 'hidden'}}
          next={this.requestListings}
          hasMore={this.state.hasMore}
          endMessage={<div style={{padding: 8}}><Label as='a' color='blue'>All Item Loaded page {this.state.page} of {this.total}</Label></div>}
          loader={<div style={{padding: 8}}><Label as='a' color='teal'>Loading..</Label></div>}>
          <Card.Group style={{padding: 8}}>
            {this.state.list.map((item, key) => {
              return (
                <StoreItem
                  key={key}
                  name={item.name}
                  address={item.address}
                  views={item.views_count}
                  square={item.square_footage}
                  capacity={item.capacity}
                  price={item.hourly_price ? item.hourly_price : item.daily_price}
                  tag={item.hourly_price ? 'hour' : 'day'}
                  src={item.primary_photo_css_url_small}
                />)
            })}
          </Card.Group>
        </InfiniteScroll>
      </MainContainer>
    )
  }
}

export default App;
