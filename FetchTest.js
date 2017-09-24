import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigationBar from './NavigationBar'
import HttpUtils from './HttpUtils'

class FetchTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  onLoad(url) {
    // fetch(url)
    //   .then(response => response.json())
    //   .then(result => {
    //     this.setState({
    //       result: JSON.stringify(result)
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       result: JSON.stringify(error)
    //     })
    //   })
    HttpUtils.get(url)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }

  onSubmit(url, params) {
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     this.setState({
    //       result: JSON.stringify(result)
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       result: JSON.stringify(error)
    //     })
    //   })
    HttpUtils.post(url, params)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="FetchTest"/>
        <Text
          onPress={() => this.onLoad('http://rapapi.org/mockjsdata/18987/listViewTest')}
        >获取数据</Text>
        <Text
          onPress={() => this.onSubmit('http://rapapi.org/mockjsdata/18987/submit',{
            password: 123,userName: '小明'
          })}
        >提交错误</Text>
        <Text> 返回结果：{this.state.result}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = FetchTest;