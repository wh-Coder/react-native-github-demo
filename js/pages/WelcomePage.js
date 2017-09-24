import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('HomePage')
      // TODO： 跳过去还要把欢迎页面从路由占里面删掉
    }, 2000)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'欢迎'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});