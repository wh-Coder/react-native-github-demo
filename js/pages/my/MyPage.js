import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'

class MyPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <NavigationBar title="我的" style={{backgroundColor: '#6495ED'}}/>
        <Text
          style={styles.tips}
          onPress={() => navigate('CustomKeyPage')}
        >自定义标签</Text>
        <Text
          style={styles.tips}
          onPress={() => navigate('SortKeyPage')}
        >标签排序页</Text>
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
  }
});

module.exports = MyPage;