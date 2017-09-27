import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Text,
  View,
} from 'react-native';
import Language, {FLAG_LANGUAGE} from '../../common/Language'
import SortableListView from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'

class SortKeyPage extends Component {

  constructor(props) {
    super(props)
    this.dataArrray = []  // 所有数组
    this.sortResultArray = []
    this.originalCheckedArray = []

    this.language = new Language(FLAG_LANGUAGE.flag_key)

    this.state = {
      checkedArray: [],
    }
  }


  componentDidMount() {
    this.loadLanguage()
  }


  loadLanguage() {
    return this.language.fetch()
      .then(result => {
        this.dataArrray = result
        let checkedArray = this.dataArrray.filter(item => item.checked === true)
        this.originalCheckedArray = checkedArray.slice(0)
        this.setState({
          checkedArray: checkedArray
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onSave() {
    this.getSortResult()
    this.language.save(this.sortResultArray)
    this.props.navigation.goBack()
  }

  onBack() {
    // TODO: 判断数组是否相等
    if (this.originalCheckedArray == this.state.checkedArray) {
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

  getSortResult() {
    this.sortResultArray = this.dataArrray.slice(0)
    this.originalCheckedArray.map((item, i) => {
      let index = this.dataArrray.indexOf(item)
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
    })
  }

  render() {
    let order = Object.keys(this.state.checkedArray)
    const rightButton = <TouchableOpacity onPress={() => this.onSave()}>
      <View style={{margin: 10}}>
        <Text style={styles.save}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
          title={'标签排序页面'}/>
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArray}
          order={order}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    )
  }
}

class SortCell extends Component {
  render() {
    return <TouchableHighlight
      underlayColor={'#eee'}
      style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
      {...this.props.sortHandlers}
    >
      <Text>{this.props.data.name}</Text>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  save: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = SortKeyPage;