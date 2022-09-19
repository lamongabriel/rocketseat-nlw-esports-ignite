import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface ButtonGoBackProps{
  size: number
  color: string
}

export function ButtonGoBack({size, color}: ButtonGoBackProps) {

  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <Entypo name='chevron-thin-left' size={size} color={color} />
    </TouchableOpacity>
  );
}