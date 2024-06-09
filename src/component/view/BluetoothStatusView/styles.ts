import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center',
  },
  container: {
    width: 10,
    height: 10,
    borderRadius: 5, // half of width and height to make it a circle
  }
});

export default styles;