import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { login } from '../redux/actions/actions';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
    state = {
        userId: null,
        password: null
    }

    onLogin = () => {
        const { userId, password } = this.state;
        const { navigation, login } = this.props;
        login({ userId, password })
            .then(() => navigation.navigate('Home'))
            .catch(() => Alert.alert(
                "Login Fail",
                "You have entered an invalid username or password",
                [{
                    text: "OK", onPress: () => this.setState({
                        userId: null,
                        password: null
                    })
                }],
            ));
    }

    onChange = (type) => (e) => {
        const value = e.nativeEvent.text;
        this.setState({ [type]: value });
    }

    render() {
        const { userId, password } = this.state;
        const isLoginDisable = !userId || !password


        return (
            <DismissKeyboard>
                <Block flex middle>
                    <ImageBackground
                        source={Images.RegisterBackground}
                        style={styles.imageBackgroundContainer}
                        imageStyle={styles.imageBackground}
                    >
                        <Block flex middle>
                            <Block style={styles.registerContainer}>
                                <Block flex space="evenly">
                                    <Block flex={0.4} middle style={styles.socialConnect}>
                                        <Block flex={0.5} middle>
                                            <Text
                                                style={{
                                                    fontFamily: 'montserrat-regular',
                                                    textAlign: 'center'
                                                }}
                                                color="#333"
                                                size={24}
                                            >
                                                Login
                      </Text>
                                        </Block>

                                        {/* <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="dribbble"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.DRIBBBLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block> */}
                                    </Block>
                                    {/* <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block> */}
                                    <Block flex={1} middle space="between">
                                        <Block center flex={0.9}>
                                            <Block flex space="between">
                                                <Block>
                                                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                        <Input
                                                            placeholder="User Id "
                                                            style={styles.inputs}
                                                            onChange={this.onChange("userId")}
                                                            value={userId}
                                                            iconContent={
                                                                <Icon
                                                                    size={16}
                                                                    color="#ADB5BD"
                                                                    name="profile-circle"
                                                                    family="NowExtra"
                                                                    style={styles.inputIcons}
                                                                />
                                                            }
                                                        />
                                                    </Block>

                                                    <Block width={width * 0.8}>
                                                        <Input
                                                            placeholder="Password"
                                                            password
                                                            value={password}
                                                            onChange={this.onChange("password")}
                                                            style={styles.inputs}
                                                            iconContent={
                                                                <Icon
                                                                    size={16}
                                                                    color="#ADB5BD"
                                                                    name="ruler-pencil2x"
                                                                    family="NowExtra"
                                                                    style={styles.inputIcons}
                                                                />
                                                            }
                                                        />
                                                    </Block>

                                                </Block>
                                                <Block center style={{ opacity: isLoginDisable ? 0.5 : 1 }}>
                                                    <Button
                                                        onPress={this.onLogin}
                                                        color="primary"
                                                        round style={styles.createButton}
                                                        disabled={isLoginDisable}
                                                    >
                                                        <Text
                                                            // style={{ fontFamily: 'montserrat-bold' }}
                                                            size={14}
                                                            color={nowTheme.COLORS.WHITE}
                                                        >
                                                            Login
                            </Text>
                                                    </Button>
                                                </Block>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </ImageBackground>
                </Block>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    imageBackgroundContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    imageBackground: {
        width: width,
        height: height
    },
    registerContainer: {
        marginTop: 55,
        width: width * 0.9,
        height: height < 812 ? height * 0.8 : height * 0.8,
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 4,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden'
    },
    socialConnect: {
        backgroundColor: nowTheme.COLORS.WHITE
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: "rgba(136, 152, 170, 0.3)"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: '#fff',
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: nowTheme.COLORS.PRIMARY,
        fontWeight: '800',
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 21.5
    },
    passwordCheck: {
        paddingLeft: 2,
        paddingTop: 6,
        paddingBottom: 15
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 40
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        marginHorizontal: 10
    }
});

const mapState = ({ app }) => ({ ...app });
const mapDispatch = (dispatch) => bindActionCreators({ login }, dispatch);

export default connect(mapState, mapDispatch)(Login);
