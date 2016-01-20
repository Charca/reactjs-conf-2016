'use strict';

let React = require('react-native');
let {
  StyleSheet,
  ListView,
  View,
  Text
} = React;

let Tweet = require('./Tweet');
let globals = require('../globals');

let tweetsJSON = [
  {
    "created_at": "Wed Jan 20 03:04:21 +0000 2016",
    "id": 689644604497477600,
    "id_str": "689644604497477632",
    "text": "RT @ValentinVlacic Dear #community, don't forget the meetup about #ReactJS with @philos_io tonight! #BEtech @max... https://t.co/tMup7ERUXG",
    "source": "<a href='https://huginn-muninn.herokuapp.com' rel='nofollow'>huginn-muninn</a>",
    "truncated": false,
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user":  {
      "id": 622262193,
      "id_str": "622262193",
      "name": "ReactJS News",
      "screen_name": "ReactJS_News",
      "location": "",
      "description": "#ReactJS and React Native Stories for JavaScript Web Architects, Builders, Ninjas and the like. Also checkout @AngularJS_News.",
      "url": null,
      "entities":  {
        "description":  {
          "urls":  []
        }
      },
      "protected": false,
      "followers_count": 10493,
      "friends_count": 24,
      "listed_count": 519,
      "created_at": "Fri Jun 29 19:43:17 +0000 2012",
      "favourites_count": 25056,
      "utc_offset": -18000,
      "time_zone": "Eastern Time (US & Canada)",
      "geo_enabled": true,
      "verified": false,
      "statuses_count": 8959,
      "lang": "en",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/649953464332632064/Gl_eu1Ws_normal.png",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/649953464332632064/Gl_eu1Ws_normal.png",
      "profile_link_color": "0084B4",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": false,
      "default_profile": true,
      "default_profile_image": false,
      "following": false,
      "follow_request_sent": false,
      "notifications": false
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "entities":  {
      "hashtags":  [
         {
          "text": "community",
          "indices":  [
            24,
            34
          ]
        },
         {
          "text": "ReactJS",
          "indices":  [
            66,
            74
          ]
        },
         {
          "text": "BEtech",
          "indices":  [
            100,
            107
          ]
        }
      ],
      "symbols":  [],
      "user_mentions":  [
         {
          "screen_name": "ValentinVlacic",
          "name": "Valentin Vlacic",
          "id": 2697828762,
          "id_str": "2697828762",
          "indices":  [
            3,
            18
          ]
        },
         {
          "screen_name": "philos_io",
          "name": "philos.io",
          "id": 2537721601,
          "id_str": "2537721601",
          "indices":  [
            80,
            90
          ]
        },
         {
          "screen_name": "Max",
          "name": "Max Mullen",
          "id": 7189832,
          "id_str": "7189832",
          "indices":  [
            109,
            113
          ]
        }
      ],
      "urls":  [
         {
          "url": "https://t.co/tMup7ERUXG",
          "expanded_url": "http://lnkplg.co/4NVJE",
          "display_url": "lnkplg.co/4NVJE",
          "indices":  [
            117,
            140
          ]
        }
      ]
    },
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "lang": "en"
  }
];

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      loading: true,
      dataSource: ds.cloneWithRows(tweetsJSON)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          contentInset={{bottom:48}}
          automaticallyAdjustContentInsets={false} />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <Tweet key={rowID} data={rowData} />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  }
});

module.exports = Tweets;
