interface GameBannerProps {
  bannerUrl: string;
  title: string
  adsCount: number;
}

export function GameBanner(props: GameBannerProps){
  return (
    <div className='relative transition-all hover:scale-105'>
      <img src={props.bannerUrl} alt="" />
      <div className='w-full pt-16 pb-4 px-4 bg-gameGradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white'>{props.title}</strong>
        <span className='text-zinc-300 text-sm block mt-1'>{props.adsCount} anuncio(s)</span>
      </div>
    </div>
  )
}