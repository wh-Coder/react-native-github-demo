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
import Language, {FLAG_LANGUAGE} from '../common/Language'
class PopularPage extends Component {

  constructor(props) {
    super(props)
    this.language = new Language(FLAG_LANGUAGE.flag_key)
    this.state = {
      language: []
    }
  }

  componentDidMount() {
    console.log('hello')
    this.language.fetch()
      .then(result => {
        this.setState({
          language: result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderTab() {
    return this.state.language.map((result,i,arr) => {
      if(result.checked)
      return <PopularTab key={i} tabLabel={result.name}>{result.name}</PopularTab>
    })
  }

  render() {
    let len = this.state.language.length
    if(len ===0 ) return <View style={styles.container}/>
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
          {this.renderTab()}
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