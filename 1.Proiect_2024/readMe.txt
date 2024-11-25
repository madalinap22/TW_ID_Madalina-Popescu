1. Tema proiectului: Administrare locuri de parcare cu Google Maps

2. Arhitectura proiectului:
2.1. Back-end: Un server RESTful construit cu Node.js si Express, care va gestiona operatiile CRUD pentru entitatile din baza de date.
Pentru verificare voi folosi Postman.
2.2. Front-end SPA: O aplicatie construita cu React.js pentru gestionarea interactiunii utilizatorilor.
Serviciu Extern: Integrarea Google Maps API pentru afisarea locatiilor de parcare.

3. Baza de date
Voi folosi SQLite si voi avea 2 entitati:
a. Parcare (ParkingLot):
ID
Nume parcare (string)
Adresa (string)
Capacitate totala (int)
Coordonate geografice (latitudine si longitudine)

b.Loc de parcare (ParkingSpot):
ID
ID-ul parcarii parinte (foreign key)
Numar loc (int)
Status (ocupat / liber)




