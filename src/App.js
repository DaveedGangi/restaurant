import {Component} from 'react'

import {MdLocalGroceryStore} from 'react-icons/md'

import './App.css'

const selecting = {
  number: 0,
}

class App extends Component {
  state = {
    restaurantNames: '',
    tabs: [],
    dishes: [],
    tabSelection: selecting.number,
    count: 0,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(api)
    const responseToJson = await response.json()
    console.log(responseToJson)
    console.log(responseToJson[0].restaurant_name)
    const restaurantName = responseToJson[0].restaurant_name
    console.log(responseToJson[0].restaurant_image)
    console.log(responseToJson[0].nexturl)
    console.log(responseToJson[0].table_menu_list)

    if (response.ok === true) {
      const detailsOfTab = responseToJson[0].table_menu_list.map(each => ({
        name: each.menu_category,
        id: each.menu_category_id,
      }))
      const {tabSelection} = this.state
      console.log(tabSelection)

      const dish = responseToJson[0].table_menu_list[
        tabSelection
      ].category_dishes.map(each => ({
        name: each.dish_name,
        id: each.dish_id,
        addonCat: each.addonCat,
        dishAvailable: each.dish_Availability,
        dishType: each.dish_Type,
        dishCalories: each.dish_calories,
        dishCurrency: each.dish_currency,
        dishDescription: each.dish_description,
        dishImageUrl: each.dish_image,
        dishPrice: each.dish_price,
        nxtUrl: each.nexturl,
      }))
      console.log(dish)

      this.setState({
        restaurantNames: restaurantName,
        tabs: detailsOfTab,
        dishes: dish,
      })
    }
  }

  changeTabItems = event => {
    console.log(event.target.id)
    console.log(typeof event.target.id)

    if (event.target.id === '11') {
      this.setState({tabSelection: 0})
      this.fetchData()
    } else if (event.target.id === '12') {
      this.setState({tabSelection: 1})
      this.fetchData()
    } else if (event.target.id === '13') {
      this.setState({tabSelection: 2})
      this.fetchData()
    } else if (event.target.id === '14') {
      this.setState({tabSelection: 3})
      this.fetchData()
    } else if (event.target.id === '15') {
      this.setState({tabSelection: 4})
      this.fetchData()
    } else if (event.target.id === '17') {
      this.setState({tabSelection: 5})
      this.fetchData()
    }
  }

  addOne = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  minusOne = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  render() {
    const {restaurantNames, tabs, dishes, count} = this.state
    console.log(tabs)
    return (
      <div>
        <div>
          {restaurantNames} <p>My Orders</p>
          <MdLocalGroceryStore />
          {count}
        </div>

        <div>
          {tabs.map(each => (
            <button
              type="button"
              key={each.id}
              id={each.id}
              onClick={this.changeTabItems}
            >
              {' '}
              {each.name}
            </button>
          ))}
        </div>

        <div>
          {dishes.map(each => (
            <div>
              <h1 key={each.id}>{each.name}</h1>
              <p>
                {each.dishCurrency} {each.dishPrice}
              </p>
              <p>{each.dishDescription}</p>
              <p>{each.dishCalories} calories</p>
              <img
                className="imgDish"
                src={each.dishImageUrl}
                alt="DishNotFound"
              />
              <button type="button" onClick={this.minusOne}>
                -
              </button>
              <p>0</p>
              <button type="button" onClick={this.addOne}>
                +
              </button>
              {each.dishAvailable ? '' : <p>Not Available</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
