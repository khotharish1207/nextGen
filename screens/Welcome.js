import React, { Component } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';

class Welcome extends Component {
  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    return (
      <ScrollView>
        <KeyboardAvoidingView >
          <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text style={styles.header}>Header</Text>
                <TextInput placeholder="Username" style={styles.input} />
                <TextInput placeholder="Password" style={styles.input} />
                <TextInput placeholder="Confrim Password" style={styles.input} />
                <TextInput placeholder="Username" style={styles.input} />
                <TextInput placeholder="Password" style={styles.input} />
                <TextInput placeholder="Confrim Password" style={styles.input} />
                <View style={styles.btnContainer}>
                  <Button title="Submit" onPress={() => null} />
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default Welcome;
