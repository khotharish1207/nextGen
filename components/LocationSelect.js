import React, { useState } from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setServiceLocations } from '../redux/actions/actions';
import nowTheme from '../constants/Theme';

function renderLocations(serviceLocations) {
  return serviceLocations.map((location) => (
    <Picker.Item
      key={`serviceLocation_${location.cityId}`}
      label={location.cityName}
      value={`${location.stateCode}_${location.cityId}`}
    />
  ));
}

function LocationSelect({ serviceLocations, onValueChange, ...props }) {
  const [selectedValue, setSelectedValue] = useState(`MH_1`);

  const onValueChangeCustom = (itemValue) => setSelectedValue(itemValue);

  return (
    <Picker
      itemStyle={{
        color: nowTheme.COLORS.WHITE,
      }}
      style={styles.pickerItem}
      prompt="Select Location"
      selectedValue={selectedValue}
      onValueChange={onValueChange || onValueChangeCustom}
      {...props}
    >
      {renderLocations(serviceLocations)}
    </Picker>
  );
}

LocationSelect.defaultProps = {
  mode: 'dialog',
  serviceLocations: [],
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerItem: {
    color: nowTheme.COLORS.WHITE,
    fontWeight: 'normal',
    fontFamily: 'montserrat-regular',
  },
});

const mapState = ({ app: { serviceLocations } }) => ({ serviceLocations });
const mapDispatch = (dispatch) => bindActionCreators({ setServiceLocations }, dispatch);

export default connect(mapState, mapDispatch)(LocationSelect);
