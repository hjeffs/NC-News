# [Harry Jeffs](https://www.linkedin.com/in/harry-jeffs-195545308/): Northcoders News API

## [hjeffs-nc-news](https://hjeffs-nc-news.onrender.com/api)

## Summary

hjeffs-nc-news is an API designed to allow interaction with articles written by users for users. You can see all possible endpoints at [hjeffs-nc-news](https://hjeffs-nc-news.onrender.com/api).

## Prerequisites

Node.js: v14.0.0

Postgres: v12.0

## 1: Installation and Setup

From your terminal:

    cd your-desired-directory

    git clone https://github.com/hjeffs/NC-News

    cd NC-News 

## 2: Install Dependencies

Ensure [Node.js](https://nodejs.org/en) is installed, then:

    npm i

This should install all dependencies required / used in the API.

## 3: Setup Environment Variables

You will need to create two .env. files on your machine as they are included in .gitignore so they will not be available to you unless you create them.

### 3.1: .env.test

Create .env.test

Inside this file set:

    PGDATABASE=nc_news_test

### 3.2: .env.development

Create .env.development

 Inside this file set:

    PGDATABASE=nc_news

--- 

## 4: Scripts

See package.json for a list of scripts and dependencies to get the API up and running. 

The two below will get the databases working. 

    npm run setup-dbs

    npm run seed 

## 5: Additional Information

This project is by no means a finished product, it has a long way to go (as do I).

I have multiple refactors and structure updates that I would like to include in the future and I will try my best to implement them.

I appreciate anyone taking an interest in my work and feedback is always appreciated.

---
This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

        Harry Jeffs: Trainee Software Developer @ Northcoders

[LinkedIn](https://www.linkedin.com/in/harry-jeffs-195545308/)