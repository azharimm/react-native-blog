import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'
import ShowScreen from './src/screens/ShowScreen'
import {Provider} from './src/context/BlogContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen
  }, 
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'React Native Blogs'
  }
})

const App =  createAppContainer(navigator)

export default () => {
  return <Provider>
      <App />
    </Provider>
}