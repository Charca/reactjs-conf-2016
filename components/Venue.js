'use strict';

let React = require('react-native');
let {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  View,
  Text
} = React;

let URLHandler = require('react-native-url-handler');
let globals = require('../globals');

class Venue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let map;
    if(Platform.OS === 'ios') {
      map = (
        <React.MapView
          style={styles.map}
          region={{
            latitude: 37.78913,
            longitude: -122.40725,
            latitudeDelta: 0.0460,
            longitudeDelta: 0.0200
          }}
          annotations={[
            {
              latitude: 37.78913,
              longitude: -122.40725,
              title: 'Grand Hyatt San Francisco',
              subtitle: '345 Stockton St San Francisco, CA 94108'
            }
          ]}
        />
      );
    } else {
      map = (
        <TouchableOpacity onPress={this._onDirectionsPressed.bind(this)} style={styles.map}>
          <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/venue-map.png`}} style={styles.map}/>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <Image source={{uri: 'http://conf.reactjs.com/img/hyatt-react.png'}} style={{height: 120}} />
        <View style={styles.content}>
          <Text style={styles.title}>Grand Hyatt San Francisco</Text>
          <View style={styles.row}>
            <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/location-icon.png`}} style={styles.icon} />
            <Text>345 Stockton St - San Francisco, CA 94108</Text>
          </View>
          <View style={styles.row}>
            <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/world-icon.png`}} style={styles.icon} />
            <Text>grandsanfrancisco.hyatt.com</Text>
          </View>
          <View style={styles.row}>
            <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/phone-icon.png`}} style={styles.icon} />
            <Text>+1 415-398-1234</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={this._onDirectionsPressed.bind(this)}>
            <Text style={styles.buttonText}>GET DIRECTIONS</Text>
          </TouchableOpacity>
        </View>
        { map }
      </View>
    );
  }

  _onDirectionsPressed() {
    URLHandler.openUrl('https://goo.gl/maps/dgmrWHQwzmo');
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  button: {
    backgroundColor: globals.colors.secondary,
    borderRadius: 28,
    width: 200,
    padding: 16,
    alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  map: {
    flex: 1
  }
});

module.exports = Venue;
