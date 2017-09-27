import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import HomePage from './HomePage'
import WelcomePage from './WelcomePage'
import CustomKeyPage from './my/CustomKeyPage'
import SortKeyPage from './my/SortKeyPage'

const Nav = StackNavigator({
  WelcomePage: {screen: WelcomePage},
  HomePage: {screen: HomePage},
  CustomKeyPage: {screen: CustomKeyPage},
  SortKeyPage: {screen: SortKeyPage},
}, {
  navigationOptions: {header: null}
});

export default Nav