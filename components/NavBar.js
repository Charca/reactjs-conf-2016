'use strict';

var React = require('react-native');
var {
  Image,
  Navigator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var globals = require('../globals');

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: globals.colors.primary,
    height: 64
  },
  navBarText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: (Platform.OS === 'ios') ? 12 : 24
  },
  navBarTitleContainer: {
    alignSelf: 'center',
    paddingRight: (Platform.OS === 'ios') ? 0 : 74
  },
  navBarTitleText: {
    textAlign: 'center'
  },
  navBarLeftButton: {
    paddingLeft: 10,
    marginTop: (Platform.OS === 'ios') ? 0 : 8
  },
  navBarRightButton: {
    paddingRight: 10,
  }
});

var NavigationBarRouteMapper = {
  Title(route, navigator, index, navState) {
    return (
      <View style={styles.navBarTitleContainer}>
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
      </View>
    );
  },
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    // var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={styles.navBarText}>Back</Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  }
};

module.exports = (
  <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={NavigationBarRouteMapper} />
);
