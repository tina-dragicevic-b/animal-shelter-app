## Animal shelter

A web application created using ReactJS that serves as sort of blog about shelterd animals.  

## Table of contents
* [Fearutes](#features)
  * [About](#about) 
  * [List of animals](#listOfAnimals) 
  * [Donations](#donations) 
  * [News](#news) 
  * [Create new](#createNew) 

* [Install](#install)

Application uses Json Server for database; use the command below to install and run the server: 

```
npm i json-server -g
json-server --watch data.json --port 3001
```
data.json is the name of local project file where the data will be stored. It also contains some initial data that will be displayed when the app is started. 

To install node modules use the command:  

```
npm i
```

Project uses Tailwind for component styling: 

```
npm install -D tailwindcss
npx tailwindcss init
```
Install PrimeReact: 

```
npm install primereact
```

Start the broject by running the command:

```
npm run dev
```
