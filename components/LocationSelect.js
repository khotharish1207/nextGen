import React, { useState } from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setServiceLocations, setUserLocation } from '../redux/actions/actions';
import nowTheme from '../constants/Theme';

// "cityId": 1,
// "cityName": "Pune",
// "countryCode": "IN",
// "countryName": "India",
// "districtId": 1,
// "districtName": "Pune",
// "stateCode": "MH",
// "stateId": 27,
// "stateName": "Maharashtra",

function renderLocations(serviceLocations) {
  return serviceLocations.map((location) => (
    <Picker.Item
      key={`serviceLocation_${location.cityId}`}
      label={location.cityName}
      value={`${location.stateId}_${location.districtId}_${location.cityId}`}
    />
  ));
}

function LocationSelect({
  serviceLocations,
  setUserLocation,
  onValueChange,
  style,
  value,
  ...props
}) {
  const [selectedValue, setSelectedValue] = useState(`27_1_1`); // Pune

  const onValueChangeCustom = (itemValue) => {
    setSelectedValue(itemValue);
    setUserLocation(itemValue);
    onValueChange && onValueChange(itemValue);
  };

  return (
    <Picker
      style={[styles.pickerItem, style]}
      prompt="Select Location"
      selectedValue={value || selectedValue}
      onValueChange={onValueChangeCustom}
      {...props}
    >
      {renderLocations(serviceLocations)}
    </Picker>
  );
}

LocationSelect.defaultProps = {
  mode: 'dialog',
  serviceLocations: [],
  style: {},
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
const mapDispatch = (dispatch) => bindActionCreators({ setUserLocation }, dispatch);

export default connect(mapState, mapDispatch)(LocationSelect);
