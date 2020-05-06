import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text, Card } from 'galio-framework';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { articles, nowTheme, topics, feeds } from '../constants';

const { width } = Dimensions.get('screen');

class Feeds extends React.Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          h4
          style={{
            fontFamily: 'montserrat-regular',
            marginBottom: nowTheme.SIZES.BASE / 2,
          }}
          color={nowTheme.COLORS.HEADER}
        >
          Categories
        </Text>
        {feeds.map((feed, idx) => (
          <Card
            flex
            borderless
            style={styles.card}
            title="Christopher Moon"
            caption="139 minutes ago"
            location="Los Angeles, CA"
            avatar="http://i.pravatar.cc/100?id=skater"
            imageStyle={styles.cardImageRadius}
            imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            image={feed.urlToImage}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articles: {
    width: width - nowTheme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Feeds;
