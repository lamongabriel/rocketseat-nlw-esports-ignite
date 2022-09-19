import { View, Text } from 'react-native';

import { styles } from './styles';

export function NoAdsFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nenhum anúncio encontrado!</Text>
    </View>
  );
}