import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from './Form/Input';

import { Game } from '../screens/Home';

//ICONS
import { Check, GameController, CaretDown } from 'phosphor-react'

export function CreateAdModal(){

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [gameId, setGameId] = useState<string>('')
  const [useVoiceChat, setUseVoiceChat] = useState<boolean>(false)
 
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  async function handleSubmit(event: FormEvent){
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    try {
      axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        "name": data.nickname,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChat
      })
      alert('Anúncio criado com sucesso!')
    } catch (error){
      alert('Erro de criação')
    }
  }

  return (
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
    
    <Dialog.Content className='fixed bg-[#2A2634] py-8 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] phone:w-[95%] phone:max-h-[600px] phone:before:w-0 shadow-lg before:content-[""] before:h-full before:w-1 before:bg-red-50 before:absolute before:left-0 before:bg-nlwVerticalGradient before:top-0 overflow-scroll'>

      <Dialog.Title className='text-white text-3xl font-black'>Públique um anúncio</Dialog.Title>
      <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="gameName" className='font-semibold'>Qual o game?</label>
          <Select.Root onValueChange={setGameId} name='gameName'>
            <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between text-white'>
              <Select.Value placeholder="Selecione o game que deseja jogar" />
              <Select.Icon><CaretDown size={20} /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport className='bg-zinc-900 py-3 px-4 rounded text-white text-sm'>
                  {games.map(game =>(
                    <Select.Item className='p-2 cursor-pointer' key={game.id} value={game.id}>
                      <Select.ItemText>{game.title}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
        </Select.Root>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="nickname">Seu nome (ou nickname)</label>
          <Input 
            type="text" 
            name="nickname" 
            id="nickname" 
            placeholder='Como te chamam dentro do game?' 
          />
        </div>

        <div className='grid grid-cols-2 gap-6 phone:grid-cols-1'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
            <Input 
              type="number" 
              name="yearsPlaying" 
              id="yearsPlaying" 
              placeholder='Tudo bem ser ZERO' 
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="discord">Qual seu Discord?</label>
            <Input 
              type="text" 
              name="discord" 
              id="discord" 
              placeholder='Usuario#0000' 
            />
          </div>
        </div>

        <div className='flex gap-6 phone:flex-col'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="weekDays">Quando costuma jogar?</label>
            <div>
              <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' value={weekDays} onValueChange={setWeekDays}>
                <ToggleGroup.Item value='0'
                  title='Domingo'
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >D</ToggleGroup.Item>
                <ToggleGroup.Item value='1'
                  title='Segunda-Feira'
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >S</ToggleGroup.Item>
                <ToggleGroup.Item value='2'
                  title='Terça-Feira'
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >T</ToggleGroup.Item>
                <ToggleGroup.Item value='3'
                  title='Quarta-Feira'
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >Q</ToggleGroup.Item>
                <ToggleGroup.Item value='4'
                  title='Quinta-Feira'
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >Q</ToggleGroup.Item>
                <ToggleGroup.Item value='5'
                  title='Sexta-Feira'
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >S</ToggleGroup.Item>
                <ToggleGroup.Item value='6'
                  title='Sábado'
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >S</ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor="hourStart">Qual horário do dia?</label>
            <div className='grid grid-cols-2 gap-2'>
              <Input 
                type="time" 
                name='hourStart' 
                id='hourStart' 
                placeholder='De'
              />
              <Input 
                type="time" 
                name='hourEnd' 
                id='hourEnd' 
                placeholder='Até'
              />
            </div>
          </div>
        </div>

        <div className='mt-2 flex gap-2 text-sm items-center'>
          <Checkbox.Root 
            checked={useVoiceChat} 
            onCheckedChange={(checked) => checked ? setUseVoiceChat(true) : setUseVoiceChat(false)} 
            className='w-6 h-6 rounded bg-zinc-900 p-1' 
            id="useVoiceChat"
            >
            <Checkbox.Indicator>
              <Check className='w-4 h-4 text-emerald-400' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor="useVoiceChat">Costumo me conectar ao chat de voz</label>
        </div>

        <footer className='mt-4 flex phone:flex-col justify-end gap-4'>
          <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
          <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 phone:justify-center' type='submit'><GameController size={24} /> Encontrar duo</button>
        </footer>

      </form>
    </Dialog.Content>
  </Dialog.Portal>
  )
}