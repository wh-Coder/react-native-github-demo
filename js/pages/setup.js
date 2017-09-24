import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import HomePage from './HomePage'
import WelcomePage from './WelcomePage'

const Nav = StackNavigator({
  WelcomePage: {screen: WelcomePage},
  HomePage: {screen: HomePage},
}, {
  navigationOptions: {header: null}
});

export default Nav