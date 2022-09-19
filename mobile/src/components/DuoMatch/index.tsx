import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native'
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

  const [isCopying,  setIsCopying] = useState(false)

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discord copiado!', 'Adicione no Discord e bora jogar!')
    setIsCopying(false)
  }

  return (
    <Modal transparent statusBarTranslucent animationType='slide' {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>

          <CheckCircle size={64} weight='bold' color={THEME.COLORS.SUCCESS}/>

          <Heading style={{alignItems: 'center', marginTop: 24}} title="Let's play!" subtitle='Agora é só começar a jogar!'/>

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity disabled={isCopying} onPress={handleCopyDiscordToClipboard} style={styles.discordButton}>
            <Text style={styles.discord}>{isCopying? <ActivityIndicator /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}