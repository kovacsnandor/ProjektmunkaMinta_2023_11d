
# Minden t�bla
SELECT * FROM cars;
SELECT * FROM trips;
SELECT * FROM users;
select * from drivers;

# ----------------------------
# Lek�rdez�sek

# get .../cars
SELECT id, name, licenceNumber, hourlyRate, 
  if(outOfTraffic, 'true', 'false') 
  outOfTraffic, driverId FROM cars; 


# get .../cars/1
SELECT id, name, licenceNumber, hourlyRate, 
  if(outOfTraffic, 'true', 'false') 
  outOfTraffic, driverId FROM cars
  WHERE id = 1;

# get .../carsWithDrivers
# get Aut�k vezet�ikkel ahol nincs vezet� azt is
select c.id, c.name, c.licenceNumber, c.hourlyRate, 
if(c.outOfTraffic, 'true','false') outOfTraffic,
c.driverId, d.driverName 
from cars c
left join drivers d on d.id = c.driverId;

# get .../carsWithDriversReal
# get Aut�k vezet�ikkel ahol nincs vezet� azt nem
select c.id, c.name, c.licenceNumber, c.hourlyRate, 
if(c.outOfTraffic, 'true','false') outOfTraffic,
c.driverId, d.driverName 
from cars c
inner join drivers d on d.id = c.driverId
where c.outOfTraffic = 0;



## Adatmanipul�ci�k
# car t�rl�s
DELETE FROM cars
  WHERE id = 3;

# car hozz�ad�s
INSERT cars 
  (name, licenceNumber, hourlyRate,outOfTraffic, driverId)
  VALUES
  ('BMW', 'BB-111', 2200, 0, 2);

UPDATE cars SET
    name = 'Toyota2',
    licenceNumber = 'TTT-285',
    hourlyRate = 2477,
    outOfTraffic = false,
    driverId = 13
    WHERE id = 2;


# car m�dos�t�s
UPDATE cars SET
  name = 'Mercedes',
  licenceNumber = 'MM-111',
  hourlyRate = 2200
  WHERE id = 4;

#tripsByCarId/:id
# adott kocsi trips-jei
SELECT id, numberOfMinits, DATE_FORMAT(date, '%Y.%m.%d %h:%i:%s') date from trips
  WHERE carId = 1
  ORDER BY date DESC
;

# trips by id

SELECT id, numberOfMinits, DATE_FORMAT(date, '%Y.%m.%d %h:%i:%s') date from trips
  WHERE id = 1
;

# trips by id
SELECT id, numberOfMinits, DATE_FORMAT(date, '%Y.%m.%d %h:%i:%s') date from trips;

# insert trips
INSERT trips 
  (numberOfMinits, date, carId)
  VALUES
  (25, '2022.10.13 12:20:00', 1);



# lek�rdez�sek
# get /cars
SELECT id, name, licenceNumber, hourlyRate, 
if(outOfTraffic, 'true', 'false') outOfTraffic, 
driverId FROM cars;


# driversAbc
# Sof�r�k ABC-ben
SELECT id, driverName FROM drivers
  ORDER BY driverName;

# freeDriversAbc
# Azok a sof�r�k, akik m�g nem kaptak aut�t Abc-ben
SELECT d.id, d.driverName from drivers d
  LEFT JOIN cars c on d.id = c.driverId
  WHERE c.driverId is NULL
ORDER BY d.driverName;

# carsWithDrivers
# Aut�k vezet�ikkel ha nincs, akkor is
select c.id, c.name, c.licenceNumber, c.hourlyRate, 
  if(c.outOfTraffic, 'true','false') outOfTraffic,
  c.driverId, d.driverName from cars c
  left join drivers d on d.id = c.driverId;

# carsWithDriversReal
# Aut�k vezet�ikkel (ahol t�nyleg van vezet� �s forgalomban van)
select c.id, c.name, c.licenceNumber, c.hourlyRate, 
  if(c.outOfTraffic, 'true','false') outOfTraffic,
  c.driverId, d.driverName from cars c
  inner join drivers d on d.id = c.driverId
where c.outOfTraffic = 0;


# tripsByCarId/2
# Az aut� fuvarjai
SELECT id, numberOfMinits, DATE_FORMAT(date, '%Y.%m.%d %h:%i:%s') date, carId from trips
    WHERE carId = 1;

