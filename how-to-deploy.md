# How to deploy this project

## Update and Upgrade the server

```bash
sudo apt update && apt upgrade -y
```

## Install other packages

```bash
sudo apt install nginx certbot python3-certbot-nginx npm -y
```

## Install pm2

```bash
npm install -g pm2
```

## Install nvm and nodejs

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
exec $SHELL
nvm install --lts
```

## Allow Firewall Access

```bash
sudo ufw allow "Nginx Full"
ufw allow OpenSSH
ufw enable
```

## Create nginx config file

Assuming the domain is `rajcpaworld.com` and the app name is `link-short`

```bash
vim /etc/nginx/sites-available/link-short
```

```nginx
server {
        listen 80;
        server_name rajcpaworld.com www.rajcpaworld.com;

        gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

        location /_next/static/ {
            alias /var/www/link-short/.next/static/;
            expires 365d;
            access_log off;
        }

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```

## Make sure the nginx config file is correct

```bash
nginx -t
```

## Change nginx.conf file

Just change the change `include /etc/nginx/sites-enabled/*;` to `include /etc/nginx/sites-available/*`

```bash
vim /etc/nginx/nginx.conf
```

## Remove default nginx config file

```bash
rm /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-available/default
```

## Restart nginx

```bash
sudo systemctl restart nginx
```

## Clone the project

```bash
cd /var/www && git clone https://github.com/Domain13/link-shortener-v3 link-short
```

## Go to the project directory

```bash
cd link-short
```

## Install the project

```bash
npm install
```

## Create a .env file

Create a `.env.local` file and add the following environment variables:

- MONGODB_URI
- JWT_SECRET
- NODE_ENV

```bash
vim .env.local
```

## Build the project

```bash
npm run build
```

## Start the project

```bash
pm2 start npm --name "link-short" -- start
```

## Save the pm2 process

```bash
pm2 save
```

## Setup the SSL

```bash
sudo certbot --nginx -d rajcpaworld.com -d www.rajcpaworld.com
```
