import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { ButtonGoBack } from '../../components/ButtonGoBack';
import { NoAdsFound } from '../../components/NoAdsFound';
import { DuoCard } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';


import { GameParams } from '../../@types/navigation';
import { DuoCardProps } from '../../components/DuoCard';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute();
  const game = route.params as GameParams

  useEffect(()=>{
    fetch(`http://192.168.101.23:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, [])

  async function getDiscordUser(adsId:string) {
    fetch(`http://192.168.101.23:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <ButtonGoBack size={20} color={THEME.COLORS.CAPTION_300 } />

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right}></View>
        </View>

        <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode='cover'/> 

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!'/>

        {duos.length > 0 ? 
          <FlatList 
            data={duos} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            style={styles.containerList}
          />
          :
          <NoAdsFound />
        }

        <DuoMatch onClose={() => setDiscordDuoSelected('')} visible={discordDuoSelected.length > 0 ? true : false} discord={discordDuoSelected} />

      </SafeAreaView>
    </Background>
  );
}