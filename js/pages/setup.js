import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import HomePage from './HomePage'
import WelcomePage from './WelcomePage'
import CustomKeyPage from './my/CustomKeyPage'

const Nav = StackNavigator({
  WelcomePage: {screen: WelcomePage},
  HomePage: {screen: HomePage},
  CustomKeyPage: {screen: CustomKeyPage},
}, {
  navigationOptions: {header: null}
});

export default Nav