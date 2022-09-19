import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'

import { Game } from './Home'

import { CreateAdBanner } from '../components/CreateAdBanner'
import { CreateAdModal } from '../components/CreateAdModal'

import {GameController} from 'phosphor-react'

import logo from '../assets/logo-nlw-esports.svg'
import { CreateConnectModal } from '../components/CreateConnectModal';

interface AdsList {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
}

export function ListAds(){
  const { gameId } = useParams()
  const [ adsList, setAdsList ] = useState<AdsList[]>([])
  const [ discord, setDiscord ] = useState<string>('user#1234')

  const [ currentGame, setCurrentGame ] = useState<Game>()

  useEffect(() => {
    axios(`http://localhost:3333/games/${gameId}/ads`).then(response => setAdsList(response.data))
  }, [])

  useEffect(() => {
    axios(`http://localhost:3333/games/`).then(response => setCurrentGame(response.data.find((element: {id: string}) => element.id === gameId)))
  }, [])

  function handleConnect(adId: string){
    axios(`http://localhost:3333/ads/${adId}/discord`).then(response => setDiscord(response.data.discord))
  }

  return (
    <div className='w-[1344px] max-w-[90%] mx-auto mb-10'>

      <img src={logo} className='mx-auto mt-20' alt="Logo NLW eSports" />

      <div className='flex flex-row my-20 justify-between gap-10 items-start tablet:flex-col'>
        <div className='w-full tablet:order-1'>
          {adsList.length > 0 ?
            adsList.map((ad, index )=> (
              <div className={`bg-[#2A2634] text-white w-full px-8 py-6 rounded-lg overflow-hidden flex phone:flex-col phone:gap-4 phone:text-center justify-between items-center ${index > 0 ? 'mt-8' : ''}`}>
                <div>
                  <p><strong>{ad.name}</strong>, já joga há <strong>{`${ad.yearsPlaying} ano(s)`}</strong></p>
                  <p><strong>{`${ad.weekDays.length} dias \u2022 ${ad.hourStart} - ${ad.hourEnd}`}</strong></p>
                  {ad.useVoiceChannel ? <p className='text-[#34D399]'>Usa chat de voz!</p> : <p className='text-[#F87171]'>Não chat de voz :(</p>} 
                </div>
                <div>
                  <Dialog.Root>
                    <Dialog.Trigger onClick={() => {handleConnect(ad.id)}} className='inline-flex gap-3 bg-violet-500 py-3 px-4 hover:bg-violet-600 hover:transition-all text-white rounded-md'>
                      <GameController size={24} />Conectar-se
                    </Dialog.Trigger>
                    <CreateConnectModal discord={discord} />
                  </Dialog.Root>
                </div>
              </div>
            )) 
          : 
          <div className='font-black text-white text-7xl tablet:text-4xl tablet:text-center'>Nenhum anúncio<br/>encontrado!</div>
          }
        </div>
        <div className='tablet:order-0 tablet:m-auto'>
          <img className='w-full' src={currentGame?.bannerUrl}></img>
          <p className='text-white mt-6 text-4xl'><strong>{currentGame?.title}</strong></p>
        </div>
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}