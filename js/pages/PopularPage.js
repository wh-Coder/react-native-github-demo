import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HttpUtils from '../common/HttpUtils'

class PopularPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  onLoad() {
    HttpUtils.get('https://api.github.com/search/repositories?q=' + this.text + '&sort=stars')
      .then(res => {
        this.setState({
          result: JSON.stringify(res)
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
        <NavigationBar
          title='最热'
          style={{backgroundColor: '#6495ED'}}
        />
        <Text
          style={styles.tips}
          onPress={() => {
            this.onLoad()
          }}
        >获取</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.text = text}
        />
        <Text style={{height: 500}}>{this.state.result}</Text>
      </View>
    )
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
    height:40,
    borderWidth: 1,
  }
});

module.exports = PopularPage;