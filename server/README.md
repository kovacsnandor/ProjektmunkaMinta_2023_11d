# npm rojekt indítása
## 0. git repo létrehozás
`git init`

## 1. npm projekt inicializálása
`npm init -y`
node_modules mappa újratöltése: `npm install`

## 2. A csomagok telepítése
- [express](https://www.npmjs.com/package/express): `npm i express`
    - szerver csomag
- [mysql](https://www.npmjs.com/package/mysql): `npm i mysql`
    - kapcsolódás mysql adatbázishoz

## 3. .gitignore létrehozás
Azokat nem verziózza, amit ebbe fájlba írunk 

## 4. szerver fájl létrehozása
- Data server fájl: `server.js`
- indító szkript létrehozása a `package.json`-ban
- idítás: `npm run dev`

# A server létrehozása
- branch: `02_express_server`
átmásoltuk a doksiból

## request.rest létrehozás
a `request.rest` fájllal pingeljük a szervert

# connect mysql

# connect, .env
A .env fájlba kirakjuk a kapcsolódáshoz és egyebekhez szükséges paramétereket.

Ennek elérésehz új csomag szükséges: 'dotenv'





