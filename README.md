# How to run project in DEV MODE:

```bash
npm install
npm run development
go to http://localhost:8001/
```

# How to run project in DEV MODE in Telegram Mini App over HTTPS with Hot Reloading in MacOS

1. Add in `/etc/hosts`:

```bash
127.0.0.1 secure.localhost
```

Run terminal commands inside working repo:

1. First, install mkcert using Homebrew:

```bash
brew install mkcert
```

2. Create a .cert directory in your project folder and generate an SSL certificate for secure.localhost:

```bash
mkdir -p .cert && mkcert -key-file ./.cert/localhost-key.pem -cert-file ./.cert/localhost.pem 'secure.localhost'
```

3. To make the certificate trusted by your system, install the certificate authority:

```bash
mkcert -install
```

4. Run the following commands to start the server:

```bash
npm install
npm run development-https
go to https://secure.localhost/
```

# Translations:

1. Extract lexemes from the codebase:

```bash
npm run lexemes-extract
```

2. Translate all lexemes from `lang/ru.json` to `lang/en.json`. The Russian translations serve as the source of truth, and English translations should be added for each corresponding key.

3. After translation, compile the lexemes:

```bash
npm run lexemes-compile
```

This will update the compiled translations in the `compiled-lang` directory which are used by the application.
