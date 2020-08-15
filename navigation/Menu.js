import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useSafeArea } from 'react-native-safe-area-context';
import Images from '../constants/Images';
import {
  DrawerItem as DrawerCustomItem,
  Icon,
  LocationSelector,
  Dialog,
  Divider,
  Input,
  Button,
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
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');


  const { token, user, userName } = auth || {};

  const onLogin = () => {

    props.login({ userId, password })
      .then(() => setloginVisible(false))
      .catch(() => Alert.alert(
        "Login Fail",
        "You have entered an invalid username or password",
        [

          { text: "OK", onPress: () => { setUserId(""); setPassword('') } }
        ],
        { cancelable: true }))
  };

  const screens = [
    'Home',
    // 'Components',
    // token ? 'Profile' : null,
    token ? null : 'Signup',
    token ? null : 'Login',
  ].filter((x) => x);

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
            {userName && (
              <>
                <Text style={styles.text}>USER</Text>
                <Text style={styles.text}>{userName}</Text>
              </>
            )}

            {/* <Text style={styles.text} size={14} color={nowTheme.COLORS.WHITE}>
              Your City
            </Text> */}
            {/* <LocationSelector /> */}
          </Block>
          {token && <DrawerCustomItem
            title={'LOGOUT'}
            navigation={navigation}
            onPress={props.logout}
          />}
        </ScrollView>
      </Block>

      <Dialog visible={loginVisible} title={`Login`} onClose={() => setloginVisible(false)}>
        <Text size={16}>User Name</Text>
        <Block>
          <Input
            placeholder="User Name"
            iconContent={<Block />}
            onChange={(e) => setUserId(e.nativeEvent.text)}
            shadowless
            value={userId}
          />
        </Block>
        <Text size={16}>Password</Text>
        <Block>
          <Input
            placeholder="Password"
            iconContent={<Block />}
            shadowless
            value={password}
            password
            onChange={(e) => setPassword(e.nativeEvent.text)}

          />
        </Block>

        <Block center style={{ marginTop: 20, opacity: (!userId || !password) ? 0.5 : 1 }} >
          <Button
            onPress={onLogin}
            round
            color="primary"
            size="small"
            disabled={!userId || !password}
          >
            Login
          </Button>
        </Block>
      </Dialog>
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
