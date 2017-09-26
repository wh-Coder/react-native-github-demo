import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Image,
  Text,
  Alert,
  View,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import Language, {FLAG_LANGUAGE} from '../../common/Language'
import CheckBox from 'react-native-check-box'

class CustomKeyPage extends Component {

  constructor(props) {
    super(props)
    this.language = new Language(FLAG_LANGUAGE.flag_key)
    this.changeValues = []
    this.state = {
      dataArray: [],
      forceRefresh: 1
    }
  }

  componentDidMount() {
    this.language.fetch()
      .then(result => {
        this.setState({
          dataArray: result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onSave() {
    // if (this.changeValues.length === 0) {
    //   // this.props.navigation.goBack()
    //   return
    // }
    this.language.save(this.state.dataArray)
    this.props.navigation.goBack()
  }

  goBack() {
    if (this.changeValues.length === 0) {
      this.props.navigation.goBack()
    } else {
      Alert.alert(
        '提示：',
        '要保存修改吗？',
        [
          {text: '不保存', onPress: () => this.props.navigation.goBack()},
          {text: '保存', onPress: () => this.onSave()}
        ]
      )
    }
  }

  onClick(data) {
    data.checked = !data.checked
    this.setState({forceRefresh: this.state.forceRefresh++})
    for (let i = 0, len = this.changeValues.length; i < len; i++) {
      let temp = this.changeValues[i]
      if (temp === data) {
        this.changeValues.splice(i, 1)
        console.log(this.changeValues)
        return
      }
    }
    this.changeValues.push(data)
    console.log(this.changeValues)
  }

  renderCheckBox(data) {
    return (
      <CheckBox
        style={{flex:1,padding: 10}}
        onClick={() => this.onClick(data)}
        isChecked={data.checked}
        leftText={data.name}
        checkedImage={<Image style={{tintColor: '#6495ED'}} source={require('./img/ic_check_box.png')} />}
        unCheckedImage={<Image style={{tintColor: '#6495ED'}} source={require('./img/ic_check_box_outline_blank.png')} />}
      />
    )
  }

  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) {
      return null
    }

    const len = this.state.dataArray.length
    let views = []
    for (let i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i + 1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }

    views.push(
      <View key={len-1}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
          {this.renderCheckBox(this.state.dataArray[len - 1])}
        </View>
        <View style={styles.line}/>
      </View>
    )

    return views
  }

  render() {
    const {goBack} = this.props.navigation
    const rightButton = <TouchableOpacity onPress={() => this.onSave()}>
      <View style={{margin: 10}}>
        <Text style={styles.save}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title="自定义标签"
          leftButton={ViewUtils.getLeftButton(() => this.goBack())}
          rightButton={rightButton}
          style={{backgroundColor: '#6495ED'}}/>
        <ScrollView>
          {this.renderView()}
        </ScrollView>
        <Text>{this.state.forceRefresh}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  save: {
    fontSize: 20,
    color: 'white'
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray'
  }
});

module.exports = CustomKeyPage;