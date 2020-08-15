import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Block, Button, theme } from 'galio-framework';

import nowTheme from '../constants/Theme';
import Divider from './Divider';

const Dialog = ({ visible, title, onClose, full, style, ...props }) => {

  const modalStyles = [styles.modalView, full ? styles.fullDialog : {}, style];

  return (
    <Modal
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={modalStyles}>
          <Block style={{ position: 'absolute', top: 10, right: 20 }}>
            <Button
              round
              onlyIcon
              color="transparent"
              icon="close"
              iconFamily="Font-Awesome"
              iconSize={theme.SIZES.BASE}
              onPress={onClose}
            />
          </Block>

          {title && (
            <>
              <Text style={styles.modalText}>{title}</Text>
              <Divider borderColor={nowTheme.COLORS.ACTIVE} />
            </>
          )}
          <Block style={{ marginTop: 15, width: '100%' }}>{props.children}</Block>
        </View>
      </View>
    </Modal>
  );
};

Dialog.defaultProps = {
  visible: false,
  onClose: () => { },
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    width: '90%',
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 20,
    opacity: 1,
    // zIndex: 9,
  },
  fullDialog: {
    width: '100%',
    height: '100%'
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Dialog;
