import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, View } from 'react-native';
import { Block, Text, Card } from 'galio-framework';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { Button, CategoryIcon } from '../components';
import { articles, nowTheme, topics } from '../constants';
import { fetchCategories, getToken } from '../redux/actions/actions';
import { chunk } from '../utils';
import Articles from './Articles'
const Tab = createMaterialTopTabNavigator();


// import { CategoryIconDummy } from '../components/CategoryIcon';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Home extends React.Component {
  componentDidMount() {
    const { categories = [] } = this.props;
    if (categories.length === 0) this.props.fetchCategories();
  }

  getChunkSize = () => {
    return Math.ceil(width / 150);
  };

  onAddNew = () => {
    const { navigation, getToken } = this.props;
    // getToken();
    navigation.navigate('add-new-feed');
  };

  renderArticles = () => {
    const { categories = [] } = this.props;

    return (
      <View>
        <Button
          onlyIcon
          icon="plus"
          iconFamily="antdesign"
          iconSize={30}
          color="primary"
          iconColor="#fff"
          style={styles.floatingButton}
          onPress={this.onAddNew}
        ></Button>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
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

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {categories.map((t, i) => (
              <CategoryIcon
                key={i + '_chunk'}
                item={t}
                style={{ marginRight: nowTheme.SIZES.BASE }}
              />
            ))}
          </ScrollView>

          <Text
            h4
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: nowTheme.SIZES.BASE / 2,
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Suggested Topics
          </Text>
          <Block row space="around" style={{ marginTop: nowTheme.SIZES.BASE, flexWrap: 'wrap' }}>
            {categories.map((t, i) => (
              <Block key={`viewed-${i}`} style={styles.shadow}>
                <CategoryIcon key={i + '_chunk'} item={t} style={styles.albumThumb} />
              </Block>
            ))}
          </Block>
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - nowTheme.SIZES.BASE * 2,
    paddingVertical: nowTheme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    // width: thumbMeasure,
    // height: thumbMeasure
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  floatingButton: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 25,
  },
});

const mapState = ({ app }) => ({ ...app });
const mapDispatch = (dispatch) => bindActionCreators({ fetchCategories, getToken }, dispatch);

// export default connect(mapState, mapDispatch)(Home);


function TabbedHome() {
  return <Tab.Navigator>
    <Tab.Screen name="Social" component={Articles} />
    <Tab.Screen name="News" component={connect(mapState, mapDispatch)(Home)} />
  </Tab.Navigator>
}

export default TabbedHome
