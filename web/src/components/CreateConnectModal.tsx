import * as Dialog from '@radix-ui/react-dialog';
import {GameController, DiscordLogo } from 'phosphor-react'

export interface CreateConnectModalProps{
  discord: string
}

export function CreateConnectModal({discord}: CreateConnectModalProps){
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
    
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg before:content-[""] before:h-full before:w-1 before:bg-red-50 before:absolute before:left-0 before:bg-nlwVerticalGradient before:top-0 overflow-hidden phone:w-[90%]'>

        <Dialog.Title className='text-white text-3xl font-black'>Conecte-se</Dialog.Title>
          <span className='block text-zinc-400'>E comece a jogar agora mesmo!</span>

          <div className='bg-zinc-900 py-3 px-4 rounded text-sm my-4 text-center'>{discord}</div>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close className='bg-zinc-500 phone:text-xs px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button
              onClick={() => {navigator.clipboard.writeText(`${discord}`); alert("Agora é só jogar!");}} 
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 phone:text-xs ' 
              type='submit'>
                <DiscordLogo size={24} className='phone:w-5 phone:h-5' /> Copiar
            </button>
          </footer>
      </Dialog.Content>
    </Dialog.Portal>
    )

}