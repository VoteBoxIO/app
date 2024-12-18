# How to run project in DEV MODE:

```bash
npm run development-http
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
