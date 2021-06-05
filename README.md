
# Getting your environment ready
## Required tools, libraries and platforms
Os                 |Tool                           |Version|Link
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Mac, Windows       | .Net Core                     |3.1    |[DotNet Core](https://dotnet.microsoft.com/download)
                   |                               |       |                                                                   | 
Mac, Windows       | NodeJs                        |14.17.0|[NodeJs](https://nodejs.org/en/)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Mac                | Docker(to run sql server)     |       |[Docker](https://docs.docker.com/docker-for-mac/install/)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Mac                | Azure Data Studio             |       |[Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Mac                | VS Code & Visual Studio for Mac|      |[Visual Studio](https://visualstudio.microsoft.com/)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Windows            | VS Code & Visual Studio 2019  |2019   |[Visual Studio](https://visualstudio.microsoft.com/)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Windows            | SQL Management Studio         |       |[SQL Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
-------------------|-------------------------------|-------|-------------------------------------------------------------------|
Mac, Windows       | Postman                       |current|[Postman](https://www.postman.com/downloads/)
-------------------|-------------------------------|-------|-------------------------------------------------------------------| 
 
## Guide to setup project
 * Clone repository
 * confirm dotnet core is installed and version is 3.1 or greater by running this command in your terminal `dotnet --version`
 * confirm nodeJs is installed and version is 14.17.0 or greater by running this command in your terminal `node -v`

### If you are using MacOS, follow these steps to run sql server in docker (_SQL Server is not supported on MacOS_)
 * Launch docker
 * Increase docker memory size to 4GB (select Preferences from the little Docker icon in the top menu, Then on the Resources > Advanced screen, slide the memory slider up to at least 4GB)
 * Open a Terminal window and run the following command to download SQL Server docker image `sudo docker pull mcr.microsoft.com/mssql/server:2019-latest`
 * Launch docker image by running this command in terminal: 
    * change the name and password parameters in the command
   `docker run -d --name sql_server_demo -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest1`
 * Visit this link for detailed steps [Run SQL Server on Mac](https://database.guide/how-to-install-sql-server-on-a-mac/)
 

### Set up DB
 * Launch Azure Data Studio GUI or SQL Server Management Studio to connect to SQL Server 
 * Run create DB go to the scripts folder `cd NeutrackAPI/NeutrackAPI/Data/Scripts`
    1. Run the CreateNeutrackDBScript.sql file (_creates the databse_)
    2. Then run the CreateDatabaseUserScript.sql file (_creates a user for the database to grant the application access_)

### Build NeutrackAPI project
 Now lets build the API project
 * Open the NeutrackAPI project in the code editor of your choice (_VS Code, Visual Studio for Mac or Visual Studio 2019_)
 * Open terminal and go to the NeutrackAPI project directory on your machine
 * If dotnet core is installed on your Machine run this command to build the project: `dotnet build`. It will take some minutes the first time you build the project.
 * After successfully building the project run this command to start the App: `dotnet run`
 * Install dotnet ef tool globally `dotnet tool install --global dotnet-ef`


Framework                 | Command                                            |Description
--------------------------|----------------------------------------------------|------------------------------------------
dotnet                    | `dotnet build`                                     | builds the dotnet project
--------------------------|----------------------------------------------------|------------------------------------------
dotnet                    | `dotnet run`                                       | starts the dotnet project
--------------------------|----------------------------------------------------|------------------------------------------
dotnet entity Framework   | `dotnet ef migrations add <MigrationName> `        | creates a migration file
--------------------------|----------------------------------------------------|------------------------------------------
dotnet entity Framework   | `dotnet ef migrations remove`                      | removes all migrations file
--------------------------|----------------------------------------------------|------------------------------------------
dotnet entity Framework   | `dotnet ef database update`                        | Updates database with current migrations
