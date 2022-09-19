import {MagnifyingGlassPlus} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner(){
  return (
    <div className='bg-[#2A2634] relative flex justify-between items-center px-8 py-6 self-stretch mt-8 rounded-lg overflow-hidden before:content-[""] before:w-full before:h-1 before:bg-red-50 before:absolute before:left-0 before:bg-nlwGradient before:top-0 largePhone:flex-col largePhone:text-center'>
        <div>
          <strong className='text-white text-2xl font-black largePhone:text-xl'>Não encontrou seu duo?</strong>
          <span className='block text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <Dialog.Trigger className='inline-flex gap-3 bg-violet-500 py-3 px-4 hover:bg-violet-600 hover:transition-all text-white rounded-md largePhone:mt-6'>
          <MagnifyingGlassPlus size={24} />  Publicar anúncio
        </Dialog.Trigger>
      </div>
  )
}