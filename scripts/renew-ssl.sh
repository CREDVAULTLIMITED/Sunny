#!/bin/bash
certbot renew
cp /etc/letsencrypt/live/sunnypayments.com/fullchain.pem docker/production/ssl/certificate.crt
cp /etc/letsencrypt/live/sunnypayments.com/privkey.pem docker/production/ssl/private.key
docker-compose -f docker/production/docker-compose.yml restart nginx
