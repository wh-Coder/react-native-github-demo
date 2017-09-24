import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  View
} from 'react-native';
import NavigationBar from './js/common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

const data = {
  "result": [
    {
      "fullName": "张三张三张三张三",
      "email": "w.jones@jones.edu"
    },
    {
      "fullName": "张三张三张三",
      "email": "c.harris@hernandez.co.uk"
    },
    {
      "fullName": "张三张三张三张三",
      "email": "k.rodriguez@williams.edu"
    },
    {
      "fullName": "张三张三",
      "email": "d.lewis@martinez.gov"
    },
    {
      "fullName": "张三张三",
      "email": "j.robinson@thompson.gov"
    },
    {
      "fullName": "张三张三",
      "email": "b.lee@wilson.org"
    },
    {
      "fullName": "张三张三张三张三",
      "email": "u.robinson@robinson.co.uk"
    },
    {
      "fullName": "张三张三张三张三张三",
      "email": "d.jackson@young.edu"
    },
    {
      "fullName": "张三张三张三张三",
      "email": "q.white@miller.edu"
    },
    {
      "fullName": "张三张三张三",
      "email": "b.martinez@miller.co.uk"
    },
    {
      "fullName": "张三张三张三",
      "email": "w.clark@jones.net"
    },
    {
      "fullName": "张三张三张三张三",
      "email": "v.davis@robinson.org"
    },
    {
      "fullName": "张三张三张三",
      "email": "y.taylor@young.edu"
    },
    {
      "fullName": "张三张三",
      "email": "f.martin@rodriguez.org"
    },
    {
      "fullName": "张三张三张三张三",
      "email": "y.robinson@hernandez.co.uk"
    },
    {
      "fullName": "张三张三张三张三张三",
      "email": "m.hall@smith.net"
    },
    {
      "fullName": "张三张三",
      "email": "r.harris@garcia.co.uk"
    }
  ],
  "statusCode": 0
}

export default class ListViewTest extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.result)
    }
  }

  renderRow(item) {
    return <View style={styles.row}>
      <TouchableOpacity onPress={() => {
        this.toast.show('你单击了：'+item.fullName,DURATION.LENGTH_LONG)
      }}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </TouchableOpacity>
    </View>
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View style={styles.line}>

    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="ListViewTest"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={item => this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
        />
        <Toast ref={toast => {this.toast = toast}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
});