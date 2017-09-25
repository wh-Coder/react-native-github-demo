import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

class RespositoryCeil extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {data} = this.props
    // console.log(data)
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.ceil_containers}>
          <Text style={styles.title}>{data.full_name}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Text>Author:</Text>
              <Image
                style={{height:22,width:22}}
                source={{uri: data.owner.avatar_url}}
              />
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Text>Stars:</Text>
              <Text>{data.stargazers_count}</Text>
            </View>
            <Image
              style={{width: 22,height: 22}}
              source={require('../../res/images/ic_star.png')}
            />
          </View>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  ceil_containers: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 6,

    // ios
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,

    // android
    elevation: 2,
  }
});

module.exports = RespositoryCeil;