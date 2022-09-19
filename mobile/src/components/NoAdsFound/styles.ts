import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.SHAPE,
    padding: 16,
    borderRadius: 8
  },
  text:{
    color: THEME.COLORS.TEXT
  }
});