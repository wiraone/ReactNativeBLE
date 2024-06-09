// Import necessary modules
import React, { useState, useEffect } from 'react';
import { NativeModules, NativeEventEmitter, FlatList, Text, View, Button } from 'react-native';
import BluetoothStatusView from '../BluetoothStatusView/BluetoothStatusView';
import styles from './styles';
import { BluetoothState } from '../BluetoothStatusView/BluetoothState';

const { BluetoothManager } = NativeModules;
const bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);

interface BluetoothScannerViewProps {
  bluetoothState: BluetoothState;
}

const BluetoothScannerView: React.FC<BluetoothScannerViewProps> = ({ bluetoothState }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Subscribe to Bluetooth device discovery events
    const deviceDiscoveredSubscription = bluetoothManagerEmitter.addListener('BluetoothDeviceDiscovered', handleDeviceDiscovered);
    
    // Clean up the subscriptions on unmount
    return () => {
      deviceDiscoveredSubscription.remove();
  };
  }, []);

  // Handle Bluetooth device discovery
  const handleDeviceDiscovered = (device: BluetoothDevice) => {
    // Only add the device if its name is not "Unnamed Device"
    if (device.name !== "Unnamed Device") {
      setDevices((prevDevices) => {
        // Prevent duplicate entries based on identifier
        if (!prevDevices.some((d) => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    }
  };

  // Start scanning for devices
  const startScanning = () => {
    setDevices([]);
    setScanning(true);
    BluetoothManager.startScanning();
  };

  // Stop scanning for devices
  const stopScanning = () => {
    setScanning(false);
    BluetoothManager.stopScanning();
  };

  return (
    <View style={styles.container}>
      <BluetoothStatusView bluetoothState={bluetoothState}/>
      <Button title={scanning ? "Stop Scanning" : "Start Scanning"} disabled={bluetoothState !== BluetoothState.PoweredOn}  onPress={scanning ? stopScanning : startScanning} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceIdentifier}>{item.id}</Text>
            <Text style={styles.deviceRssi}>RSSI: {item.rssi}</Text>
            <Text style={styles.deviceRssi}>Advertisement Data: { JSON.stringify(item.advertisementData)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BluetoothScannerView;
