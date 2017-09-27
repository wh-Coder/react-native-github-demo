/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ListViewTest from '../../test/ListViewTest'
import FetchTest from '../../test/FetchTest'
import AsyncStorageTest from '../../test/AsyncStorageTest'
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'

import Language, {FLAG_LANGUAGE} from '../common/Language'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.language = new Language(FLAG_LANGUAGE.flag_key)
    this.state = {
      selectedTab: 'tb_my',
      language:[]
    }
  }

  componentDidMount() {
    this.loadLanguage()
  }

  onPressPopular() {
    this.loadLanguage()
      .then(() => {
        this.setState({ selectedTab: 'tb_popular' })
      })
  }

  loadLanguage() {
    return this.language.fetch()
      .then(result => {
        this.setState({
          language: result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{ color: '#2196F3' }}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, { tintColor: '#2196F3' }]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.onPressPopular()}>
            <PopularPage language={this.state.language} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{ color: 'yellow' }}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, { tintColor: 'yellow' }]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <ListViewTest />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{ color: 'red' }}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, { tintColor: 'red' }]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <FetchTest/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{ color: 'yellow' }}
            title="我"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, { tintColor: 'yellow' }]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            {/*<AsyncStorageTest/>*/}
            <MyPage navigation={this.props.navigation}/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1: {
    flex: 1,
    backgroundColor: 'blue',
  },
  page2: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  image: {
    height: 22,
    width: 22,
  }
});
