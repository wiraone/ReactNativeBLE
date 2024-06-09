import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceIdentifier: {
    fontSize: 14,
    color: '#777',
  },
  deviceRssi: {
    fontSize: 12,
    color: '#333',
  },
});

export default styles;
