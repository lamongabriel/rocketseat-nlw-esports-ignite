<div style="width: 100%, text-align: center, margin: 0 auto">
  <img alt="NLW eSports Logo" src="./web/src/assets/logo-nlw-esports.svg">
</div>

# NLW eSports Ignite - Duo finding app

This app let's you find a duo for your on-line gameplays
Register an ad to allow others to find you in the app and click on others player's ads to get the Discord to connect with them.

# Configuration

## Server

```
cd /server/
npm install
```

This app get its games from the back-end and it must be running for the app to work properly, to create more games you can use the prisma studio addon.
`npx prisma studio`

## Web

```
cd /web/
npm install
npm run dev
```

## Mobile

You must have expo configured in your machine and local device or emulator to properly use the react native app, see full documentation [here](https://docs.expo.dev/get-started/installation/).

```
cd /web/
npm install
npx expo start
```

# Technologies used

<div style="display: flex">
  <img height="100" title="ReactJS" alt="ReactJS" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png">
  <img height="100" title="React Native" alt="React Native" src="https://media.slid.es/uploads/118447/images/2991881/reactpurple.png">
  <img height="100" title="NodeJS" alt="NodeJS" src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png">
  <img height="100" title="Prisma IO" alt="Prisma IO" src="https://seeklogo.com/images/P/prisma-logo-3805665B69-seeklogo.com.png">
  <img height="100" title="Talwind CSS" alt="Talwind CSS" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png">
</div>
