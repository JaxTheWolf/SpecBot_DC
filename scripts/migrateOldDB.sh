#!/bin/bash

cd ../DBs
sqlite3 scores.sqlite3 <<END_SQL
SELECT sql FROM sqlite_master;
ALTER TABLE scores ADD COLUMN money INTEGER;
UPDATE scores SET money = 5;
.quit
END_SQL
