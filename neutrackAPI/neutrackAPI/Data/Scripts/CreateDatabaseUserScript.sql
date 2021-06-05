-- Creates the login NeutrackUser with password 'uwg-cs6920'
USE master;
CREATE LOGIN NeutrackUser WITH PASSWORD = 'uwg-cs6920'; 
GO

-- Creates a database user for the login created above. 
USE NeutrackDB; 
CREATE USER NeutrackUser FOR LOGIN NeutrackUser; 
GO
