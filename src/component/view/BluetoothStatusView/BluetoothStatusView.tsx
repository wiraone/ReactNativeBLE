import React, {} from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { BluetoothState } from './BluetoothState';

interface BluetoothStatusViewProps {
  bluetoothState: BluetoothState;
}

const BluetoothStatusView: React.FC<BluetoothStatusViewProps> = ({ bluetoothState }) => {
var state: String = "unknown";
var isTurnedOn = false;

switch (bluetoothState) {
    case BluetoothState.PoweredOn:
        state = "power on";
        isTurnedOn = true;
        break;
    case BluetoothState.PoweredOff:
        state = "power off";
        isTurnedOn = false;
        break;
    case BluetoothState.Resetting:
        state = "resetting";
        isTurnedOn = false;
        break;
    case BluetoothState.Unauthorized:
        state = "unathorized";
        isTurnedOn = false;
        break;
    case BluetoothState.Unsupported:
        state = "unsupported";
        isTurnedOn = false;
        break;
    default:
        state = "unknown";
        isTurnedOn = false;
        break;
    }

  return (
    <View style={styles.root} >
        <View style={[styles.container, { backgroundColor: isTurnedOn ? 'green' : 'red' }]} />
        <Text> Bluetooth is { state }. </Text>
    </View>
  )
};

export default BluetoothStatusView;
