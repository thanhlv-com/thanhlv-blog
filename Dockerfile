# Use an official Node.js runtime as a base image
FROM node:20

# Install Git
RUN apt-get update && \
    apt-get install -y git
# Install Git


RUN mkdir -p /cache_install

# Set the working directory in the container
WORKDIR /cache_install
COPY package*.json ./
COPY pnpm*.yaml ./
COPY packages/apps/package.json ./packages/apps/package.json
COPY packages/libs/theme/package.json ./packages/libs/theme/package.json

RUN npm i -g pnpm && pnpm install
# Command to run your application

## We don't need the standalone Chromium
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
#
## Install Google Chrome Stable and fonts
## Note: this installs the necessary libs to make the browser work with Puppeteer.
#RUN apt-get update && apt-get install curl gnupg -y \
#  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#  && apt-get update \
#  && apt-get install google-chrome-stable -y --no-install-recommends \
#  && rm -rf /var/lib/apt/lists/*

WORKDIR /data
CMD ["yarn", "run","build_github"]
