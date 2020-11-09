# ProjectTrov

This Project uses the asp.net react project template to create an application that could be used to track Incidents vehicles have been in.

## Steps to Launch applciation:
1. navigate to the parent directory of ProjectTrov, then navigate into projectTrov directory, this folder also contains the CliendApp
2. Using powershell type in command "**dotnet build to build**" the server, no issues should be present
3. Using powershell type in command "**dotnet run**" to start the server in which the in-memory storage and apis are located
4. Using a second powershell window, from the same projectTrov directory navigate to the ClientApp folder
5. Using command "**npm start**" from the ClientApp folder will launch the React applciation for use

## Features and Actions:
-When first launching the application a pre-created list of Incidents will be uploaded into the server
-Using the Add Incident Button a Component will allow you to enter new incidents
-Using the filter buttong will allow you to filter the grid
-The database uses two controllers, IncidentController to manage Incidents and VinController to manage VIN numbers
-The VinController contains a call to a secondary api used to validate and retrieve additional data based on VIN numbers
-The extra data which the VinController can retrieve is easily espandable using the enumeration in the class, just add the variable id

