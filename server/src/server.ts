import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

// convert functions
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes'
import { convertMinutesToHourString } from './utils/convertMinutesToHourString'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

// -------------- GET METHODS --------------

// List all games in the database
app.get('/games', async (req, res) =>{
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games)
})

// Get ads by game
app.get('/games/:id/ads', async (req, res) => {

  const gameId = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      useVoiceChannel: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(',').map(Number),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
})

// Get discord by ad
app.get('/ads/:id/discord', async (req, res) => {

  const adID = req.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adID
    }
    
  })

  return res.json(ad)
  
})

// -------------- POST METHODS --------------

// Create an ad
app.post('/games/:id/ads', async (req, res) =>{
  const gameId = req.params.id
  const body = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.json(ad)
})

app.listen(3333)
