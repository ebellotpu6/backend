#!/bin/sh

for collection in users orders; do
  docker exec -it db_db_1 mongoimport /csv/$collection.json --jsonArray -u admin -p fullstack --type json -d ecommerce -c $collection --drop --authenticationDatabase admin
done
