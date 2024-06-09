// Define the type for the Bluetooth device
type BluetoothDevice = {
  id: string;  
  name: string;
  rssi: number;
  advertisementData: { [key: string]: any };
};