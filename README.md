# RiffServer

## Description
Riff is a messaging application built for mobile, inspired by Slack. Users chat with others in shared servers across a number of topic specific channels. They can also directly message other users.

<p float="left">
  <img src="https://user-images.githubusercontent.com/37193140/213892222-1e7017a4-b04a-4de1-b9c9-672c5da93c24.gif" width="240" height="500"/>
  <img src="https://user-images.githubusercontent.com/37193140/213892264-dd976a2a-108c-430a-b350-47b6586b5914.gif" width="240" height="500"/>
</p>

## Table of Contents
- [Repo Structure](#repo-structure)
- [Installation](#installation)
- [Features](#features)
- [Team Members](#team-members)

# Repo Structure
[RiffMessenger](https://github.com/BlueOceanDevelopment/RiffMessenge) is the front end. [RiffServer](https://github.com/BlueOceanDevelopment/RiffServer) is the back end.

## Installation
1. git clone from both RiffMessenger and RiffServer repos
1. Follow the directions of the RiffMessenger Read Me
1. Install PostgreSQL following the instructions here https://www.postgresql.org/download/
1. In your terminal, run 'npm install'
1. In your postgreSQL command line, run '/i 'INSERT_YOUR_FILE_PATH/RiffServer/server/database/schema.sql''

## Features
- Register for an account to login, secured through firebase authentification
- Join the public 'Welcome' server to meet new friends
- Create your own private servers that you can invite friends into by username
- Create channels within each server
- If you are the admin of the channel, long hold to rename or delete the channel
- Chat amongst your community by posting messages in channels
- Press on users to add them to you friends list
- See the online status of everyone in the channel and all of your friends
- Add friends by username or remove them in your friends list
- Sign out of your account

## Team Members
- Christopher Wong (Project Manager)
- Jonathan Sindorf
- James Leakos
- Jake Alexander
- Christopher Garcia
- Robert Hu
