# Agendamento

# Development
Ok, so this is an overview on how you should read the code.

This is a NextJs application, so the frontend and backend are mixed in the same
mess.

## Middleware
The first thing that runs is the "middleware.js" file. This is where the
protected routes are redirected if the user is not authenticated.

## Authentication
The authentication is handled by Next Auth. The magic uses JWT behind the scenes,
but everything is wrapped in nice functions provided by the library. The only
thing I needed to do was implement the configuration at
"/pages/api/auth/[...nextauth].js".

This configurations are made by 3 parts:
1. `authorize` - function that returns a valid user for the library to create the
token on login
1. `authOptions` - the options of the wrapper provided by the library
1. `credentialsOptions` - the options of the "credentials" provider

> The library works this way: you create a "session handler" that can authenticate
> by "providers" - like credentials, google, facebook, etc.

## Routes
This is where things get ugly, a bit. Every file here is a route - like,
`pages/auth/login.js` is the equivalent to _www.foo.com/auth/login_.

The api routes are orgaized in a simple way: all inside `/pages/api`
- the `auth` folder is for the Next Auth library
- the `user` folder is for the authenticated routes (deals with everything)
- the `register.js` deals with the registration (not handled by the Next Auth).
It only saves a new user to the database.
- the `unauthorized.js` is a fallback - if you try to access anything in the
`user` folder without beeing authenticated, this is what you get (404).
- the `debug` folder shouldn't exist
- the `index.js` was just a test ... now it's an easter egg

The frontend routes are also organized in a simple way:
- `_app.js` is the configuration page - wrapper
- `index.js` is a landing page
- the `auth` folder contains the forms (login and register)
- the `app` folder contains the protected routes
- the `404.js` is the fallback route. Try something that does not exist and get
this page.

## Database
To handle the database I'm using `prisma`. In the `prisma` folder you get the
`schema.prisma`, which is where the configurations for the database are.

When using this library, to actually create the database, you run:
```
yarn run prisma generate
```
This command creates a client in `node_modules/.prisma/client`. This client is
what you use to make calls to the database

The file `theClient.js` just imports and exports the client.

## Frontend
The frontend is made by react components in the files at the `/pages` folder.
Every file export by default a different page and the "normal" components are
in the `/components` folder.

The styles are organized in 3 layers:
1. Global css - applied to everything
1. Globals css module - this are the main things used along in the application.
1. Local css module - there is one for every page / component and this are
very specific things.



.
