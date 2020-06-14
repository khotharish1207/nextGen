import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useSafeArea } from 'react-native-safe-area-context';
import Images from '../constants/Images';
import {
  DrawerItem as DrawerCustomItem,
  Icon,
  LocationSelector,
  Dialog,
  Divider,
} from '../components';
import { login, logout } from '../redux/actions/actions';

import nowTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  auth,
  ...props
}) {
  const [loginVisible, setloginVisible] = useState(false);
  //const insets = useSafeArea();
  const { token, user } = auth;

  const screens = [
    'Home',
    'Components',
    // "Articles",
    token ? 'Profile' : null,
    // 'Account',
  ].filter((x) => x);

  console.log(`token`, token);

  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={15} color={'white'} />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}

          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Divider />
            {user && user.id && (
              <>
                <Text style={styles.text}>USER</Text>
                <Text style={styles.text}>{user.userName}</Text>
              </>
            )}

            <Text style={styles.text} size={14} color={nowTheme.COLORS.WHITE}>
              Your City
            </Text>
            <LocationSelector />
          </Block>
          <DrawerCustomItem
            title={token ? 'LOGOUT' : 'LOGIN'}
            navigation={navigation}
            onPress={token ? props.logout : () => setloginVisible(true)}
          />
        </ScrollView>
      </Block>

      <Dialog visible={loginVisible} title={`Login`} onClose={() => setloginVisible(false)} />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
  },
  text: {
    fontFamily: 'montserrat-regular',
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: nowTheme.COLORS.WHITE,
  },
});

const mapState = ({ app }) => ({ ...app });
const mapDispatch = (dispatch) => bindActionCreators({ login, logout }, dispatch);

export default connect(mapState, mapDispatch)(CustomDrawerContent);
