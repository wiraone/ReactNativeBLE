/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BluetoothScannerView from './src/component/view/BluetoohScannerView/BluetoothScannerView';
import { useEffect, useState } from 'react';
import { BluetoothState } from './src/component/view/BluetoothStatusView/BluetoothState';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { BluetoothManager } = NativeModules;
  const bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
  const [bluetoothState, setBluetoothState] = useState<BluetoothState>(BluetoothState.Unknown);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Subscribe to Bluetooth device discovery events
    const deviceStateChangeSubscription = bluetoothManagerEmitter.addListener('BluetoothStateChange', handleBluetoothDeviceStateChange);
    
    // Call the getBluetoothState() method
    BluetoothManager.getBluetoothState((state: BluetoothState) => {
      setBluetoothState(state);
    });
    
    // Clean up the subscriptions on unmount
    return () => {
      deviceStateChangeSubscription.remove();
  };
  }, []);

  const handleBluetoothDeviceStateChange = (state: BluetoothState) => {
    setBluetoothState(state)
  };

  return (
    <SafeAreaView style={backgroundStyle}>
    <BluetoothScannerView bluetoothState={bluetoothState} />
    </SafeAreaView>
  );
}

export default App;
