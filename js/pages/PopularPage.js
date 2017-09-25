import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  ListView,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HttpUtils from '../common/HttpUtils'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCeil from '../common/RespositoryCeil'


class PopularPage extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{backgroundColor: '#2196F3'}}
        />
        <ScrollableTabView
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7',height: 2}}
          renderTabBar={() => <ScrollableTabBar/>}>
          <PopularTab tabLabel="java">java</PopularTab>
          <PopularTab tabLabel="ios">ios</PopularTab>
          <PopularTab tabLabel="android">android</PopularTab>
          <PopularTab tabLabel="javascript">javascript</PopularTab>
        </ScrollableTabView>
      </View>
    )
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({
      isLoading: true
    })
    HttpUtils.get('https://api.github.com/search/repositories?q=' + this.props.tabLabel + '&sort=stars')
      .then(res => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(res.items)
        })
      })
      .catch(error => {
        this.setState({
          dataSource: JSON.stringify(error)
        })
      })
  }

  render() {
    return <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <RespositoryCeil data={data}/>}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadData()}
            colors={['#2196F3']}
            tintColor={'#2196F3'}
            title={'loading......'}
            titleColor={'#2196F3'}
          />}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 29
  },
  input: {
    height: 40,
    borderWidth: 1,
  }
});

module.exports = PopularPage;