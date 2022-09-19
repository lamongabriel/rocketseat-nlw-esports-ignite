import {Route, Routes} from 'react-router-dom'
import Home from './screens/Home'
import { ListAds } from './screens/ListAds'

export default function App(){
  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/games/:gameId/ads' element={<ListAds />} />
    </Routes>
  )
}