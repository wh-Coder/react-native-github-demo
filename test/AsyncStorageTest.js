import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../js/common/NavigationBar'

class AsyncStorageTest extends Component {

  constructor(props){
    super(props)
    this.state = {
      info: ''
    }
  }

  set() {
    AsyncStorage.setItem('test',this.text,(error) => {
      if(!error){
        this.setState({
          info: '存储成功'
        })
      }
    })
  }

  remove() {
    AsyncStorage.removeItem('test',(error) => {
      if(!error){
        this.setState({
          info: '删除成功'
        })
      }
    })
  }

  get() {
    AsyncStorage.getItem('test',(error,value) => {
      if(!error){
        this.setState({
          info: '取出存储:' + value
        })
      }else{
        this.setState({
          info: '不存在'
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="AsyncStorage"/>
        <TextInput style={{height: 30,borderWidth: 1}} onChangeText={text => this.text = text} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{margin: 10}} onPress={() => this.set()}>保存</Text>
          <Text style={{margin: 10}} onPress={() => this.remove()}>移除</Text>
          <Text style={{margin: 10}} onPress={() => this.get()}>取出</Text>
        </View>
        <Text>{this.state.info}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = AsyncStorageTest;