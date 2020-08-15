import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
//galio
import { Block, Text, theme, Icon, Button } from 'galio-framework';

import { nowTheme } from '../constants/';
import { Card } from '../components/';
import { fetchSocialPosts } from '../redux/actions/actions';
import { getLoginAlert } from '../utils/ui'



class Articles extends React.Component {


  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => this.props.fetchSocialPosts();

  onAddNew = () => {
    const { navigation } = this.props;
    // getToken();
    navigation.navigate('add-social-post');
  };
  renderCards = (isLoggedIn) => {
    const { socialPosts: { data = [] } } = this.props
    return (
      <Block style={styles.container}>

        {data.map(post => <Card item={post} showCta={false} key={post.id} isLoggedIn={isLoggedIn} />)}

        {/* <Card item={items[0]} showCta={false} isVideo /> */}

        {/* <Card item={articles[1]} showCta={false} />
        <Card item={articles[2]} isVideo full showCta={false} />

        <Card item={articles[3]} showCta={false} />
        <Card item={articles[4]} full showCta={false} />
        <Card item={articles[articles.length - 1]} isVideo full showCta={false} /> */}
      </Block>
    );
  };

  render() {

    const { auth } = this.props;
    const isLoggedIn = !!(auth && auth.userId)

    return (
      <Block flex>
        <Button
          onlyIcon
          icon="plus"
          iconFamily="antdesign"
          iconSize={30}
          color="primary"
          iconColor="#fff"
          style={styles.floatingButton}
          onPress={isLoggedIn ? this.onAddNew : getLoginAlert}
        ></Button>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh}
            />
          }
        >{this.renderCards(isLoggedIn)}</ScrollView>

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: nowTheme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: nowTheme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  floatingButton: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    position: 'absolute',
    // zIndex: 99,
    right: 15,
    bottom: 25,
  },
});

const mapState = ({ posts, app: { showBusyScreen, auth } }) => ({ ...posts, showBusyScreen, auth });
const mapDispatch = (dispatch) => bindActionCreators({ fetchSocialPosts }, dispatch);

export default connect(mapState, mapDispatch)(Articles);
