<div align="center" style='display:flex; justify-content:center'>
  <img src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' />
  <img src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
  <img src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" />
  <img src="https://img.shields.io/badge/webpack-5299c7.svg?style=for-the-badge&logo=webpack&logoColor=white" />
  <img src="https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv" />
  <img src='https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white' />
</div>

# Task Tracker Application [![Netlify Status](https://api.netlify.com/api/v1/badges/e8c2b072-4c30-4226-8bbf-9206b3b837b6/deploy-status)](https://app.netlify.com/sites/tasktrackee/deploys)

A task managment application built with **REACT. JS**

## Getting Started

1. Clone this respository into your local machine with the following command:

   ```bash
   git clone https://github.com/AlstonChan/TaskTrackee.git
   ```

   then do `cd TaskTrackee`

2. Install all required dependencies

   ```bash
   npm install
   ```

3. Before doing `npm run dev`, you have to setup a [Supabase](https://supabase.com/) project. Create a new project under your organization, copy the `anon` `public` key and the *Project URL*, paste it into the `.env` file like below.

    ``` .env
    SUPABASE_PUBLIC_ANON_KEY=your_anon_public_key_here
    SUPABASE_URL=your_project_url_here
    ```

4. Go to the Supabase **Table Editor** and create a new table with the following setup.

    - Name : Task
    - Description : (Optional)
    - ✅ Enable Row Level Security (RLS)
    - ✅ Enable Realtime
    - Columns
        - | Name         | Type         | Default Value |   Primary Key |
          |--------------|:------------:|:-------------:|:-------------:|
          | id           | int8         |               |            ✅ |
          | created_at   | timestamptz  | now()         |            ⬛ |
          | user_uid     | uuid         | NULL          |            ⬛ |
          | header       | text         | NULL          |            ⬛ |
          | desc         | text         | NULL          |            ⬛ |
          | due_date     | timestamptz  | NULL          |            ⬛ |
          | status       | text         | pending       |            ⬛ |
          | labels_id    | int8[]       | NULL          |            ⬛ |

    Create another new table for `Labels` section.

    - Name : Labels
    - Description : (Optional)
    - ✅ Enable Row Level Security (RLS)
    - ✅ Enable Realtime
    - Columns
        - | Name         | Type         | Default Value |   Primary Key |
          |--------------|:------------:|:-------------:|:-------------:|
          | id           | int8         |               |            ✅ |
          | user_uid     | uuid         | NULL          |            ⬛ |
          | label        | text         | NULL          |            ⬛ |
          | colour       | text         | NULL          |            ⬛ |

5. Add RLS policy for the application to interact with supabase without issues.

6. Do `npm run dev` and open ***[localhost:3000](http://localhost:3000)*** in your browser to view the application.

## Package. json script option

### 1. `npm run dev`

Set the `NODE_ENV` environment variable to *development* and start a webpack dev server at ***[localhost:3000](http://localhost:3000)*** using the `webpack.dev.js` configuration file. You may open ***[localhost:8888](http://localhost:8888)*** and visualized the bundle size of the application.

### 2. `npm run build-local`

Set the `NODE_ENV` environment variable to *production* and output the bundled application to `/dist` directory using the `webpack.prod.js` configuration file. The `--env ANALYZE=true` will enable **BundleAnalyzerPlugin** and open ***[localhost:8888](http://localhost:8888)*** automatically upon bundled file is outputed to the `dist` directory. Optimal for local development.

### 3. `npm run build`

Set the `NODE_ENV` environment variable to *production* and output the bundled application to `/dist` directory using the `webpack.prod.js` configuration file. The `--env ANALYZE=false` will disable **BundleAnalyzerPlugin**. Optimal for production deployment.

### 4. `npm run test`

Set the `NODE_ENV` environment variable to *test* and test all the file with the extension of `.test.js`.

## Additional Configuration File

### .env.vault

I have use a [Dotenv Vault](https://www.dotenv.org/) services to store the my `.env` file as `.env` file ***SHOULD NOT*** be commit and push to a respository, I figured that the dotenv vault is a great place to store such file. You could and should delete this file if you plan on using your own vault to store the `.env` file or you simply wanted a remove a needless file.

### netlify.toml

I deployed my application on [Netlify](https://www.netlify.com/) and use `netlify dev` to test the application. You may removed this file if you do not plan on using `netlify CLI`.

## Running **`dist`** folder file locally

To run the built version locally, install the following package (globally on your machine).

```bash
npm install -g http-server
```

Use the following command in the `dist` folder to start the server locally.

```bash
http-server
```
