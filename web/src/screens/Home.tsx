import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 

// MAIN STYLESHEET
import '../styles/main.css'

// COMPONENTS 
import { GameBanner } from '../components/GameBanner'  
import { CreateAdBanner } from '../components/CreateAdBanner'

// LOGO IMAGE IMPORT
import logo from '../assets/logo-nlw-esports.svg'

//ICONS
import { CreateAdModal } from '../components/CreateAdModal'

export interface Game {
  id: string;
  title: string;
  bannerUrl: string
  _count: {
    ads: number
  }
}

function Home() {

  const [games, setGames] = useState<Game[]>([])

  const [sliderRef, slider] = useKeenSlider(
    {
      slides:{
        perView: 6,
        spacing: 24
      },
      mode: 'snap',
      breakpoints: {
        '(max-width: 1120px)': {
          slides: {
            perView: 3,
            spacing: 24
          }
        },
        '(max-width: 512px)': {
          slides: {
            perView: 2,
            spacing: 24
          }
        }
      }
    }
  )

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  return (
    <div className='max-w-[1344px] tablet:max-w-[90%] mx-auto flex flex-col items-center m-20'>
      <img src={logo} alt="Logo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-20 tablet:text-5xl largePhone:text-4xl phone:text-3xl'>
        Seu <span className='bg-nlwGradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      {games.length > 0 ? 
        <div ref={sliderRef} className='keen-slider mt-16'>
          {games.map(game =>
            ( 
              <Link key={game.id} to={`/games/${game.id}/ads`} className='keen-slider__slide rounded-lg overflow-hidden'>
                <GameBanner 
                  key={game.id} 
                  title={game.title} 
                  bannerUrl={game.bannerUrl} 
                  adsCount={game._count.ads}
                />
              </Link>
            )
          )}
        </div>
      : ''}
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default Home