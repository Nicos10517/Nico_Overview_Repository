**Generating Schema and Tables**

```sql

CREATE SCHEMA IF NOT EXISTS final_project

CREATE TABLE final_project.disney_2024 (
  title TEXT,
  brand TEXT,
  box_revenue TEXT,
  opening_revenue TEXT,
  release_date TIMESTAMP,
  opening_rev_over_total INTEGER,
  imdb_score FLOAT,
  critics_score INTEGER,
  audience_score INTEGER
)


CREATE TABLE final_project.gdp (
  date TIMESTAMP,
  GDP FLOAT
)

COPY final_project.gdp
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\GDPC1.csv'
WITH (FORMAT CSV, HEADER)

```

**Top 500 Movies Set Up**


```sql

CREATE TABLE final_project.top_500_mov (
  rank INTEGER,
  release_date TEXT,
  title TEXT,
  url TEXT,
  production_cost TEXT,
  domestic_gross TEXT,
  worldwide_gross TEXT,
  opening_gross TEXT,
  rating TEXT,
  genre TEXT,
  theaters TEXT,
  runtime TEXT,
  year TEXT
)

COPY final_project.top_500_mov
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\top_500.csv'
WITH (FORMAT CSV, HEADER)

ALTER TABLE final_project.top_500_mov
DROP COLUMN url

UPDATE final_project.top_500_mov 
SET domestic_gross = NULL WHERE domestic_gross = '0'

UPDATE final_project.top_500_mov 
SET worldwide_gross = NULL WHERE worldwide_gross = '0' OR worldwide_gross = 'NA'

UPDATE final_project.top_500_mov 
SET opening_gross = NULL WHERE opening_gross = '0' OR opening_gross = 'NA'

UPDATE final_project.top_500_mov 
SET rating = NULL WHERE rating = '0' OR rating = 'NA'

UPDATE final_project.top_500_mov 
SET theaters = NULL WHERE theaters = '0' OR theaters = 'NA'

UPDATE final_project.top_500_mov 
SET runtime = NULL WHERE runtime = '0' OR runtime = 'NA'

UPDATE final_project.top_500_mov 
SET year = NULL WHERE year = '0' OR year = 'NA'



```

**Oscar Full Data Set Up**

```python

import csv

#Fixing the data set, used chat gpt to help with this

in_path  = r"C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\oscar_data\full_data.csv"
out_path = r"C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\oscar_data\full_data_fixed.csv"

with open(in_path, newline="", encoding="utf-8") as inf, \
     open(out_path, "w", newline="", encoding="utf-8") as outf:
    r = csv.reader(inf, delimiter="\t")
    w = csv.writer(outf, delimiter="\t", lineterminator="\n")

    header = next(r)
    n = len(header)
    w.writerow(header)

    for row in r:
        # truncate if somehow longer, then pad with blanks up to 16
        row = row[:n] + [""] * (n - len(row))
        w.writerow(row)

```

```sql

CREATE TABLE final_project.full_oscar_data (
  ceremony INTEGER,
  year TEXT,
  class TEXT,
  canonicalcategory TEXT,
  category TEXT,
  nomid TEXT,
  film TEXT,
  filmid TEXT,
  name TEXT,
  nominees TEXT,
  nomineeids TEXT,
  winner BOOLEAN,
  detail TEXT,
  note TEXT,
  citation TEXT,
  multifilmnomination BOOLEAN
)

COPY final_project.full_oscar_data
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\oscar_data\full_data_fixed.csv'
WITH (FORMAT CSV, HEADER, DELIMITER E'\t')

```

**Oscar Small Data Set Up**

```sql
CREATE TABLE final_project.oscar_data (
  year_film INT,
  year_ceremony INT,
  ceremony INTEGER,
  category TEXT,
  canon_category TEXT,
  name TEXT,
  film TEXT,
  winner BOOLEAN
)

COPY final_project.oscar_data
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\oscar_data\the_oscar_award.csv'
WITH (FORMAT CSV, HEADER)

```

**Letterboxd**

```sql

create table final_project.lbx_movies (
  id serial primary key,
  name text,
  date integer,
  tagline text,
  description text,
  minute integer,
  rating float
);

create table final_project.lbx_actors (
  id serial references final_project.lbx_movies (id),
  name text,
  role text
);

create table final_project.lbx_countries (
  id serial references final_project.lbx_movies (id),
  country text
);

create table final_project.lbx_crew (
  id serial references final_project.lbx_movies (id),
  name text,
  role text
);

create table final_project.lbx_genres (
  id serial references final_project.lbx_movies (id),
  genre text
);

create table final_project.lbx_languages (
  id serial references final_project.lbx_movies (id),
  type text,
  language text
);

create table final_project.lbx_releases (
  id serial references final_project.lbx_movies (id),
  country text,
  date date,
  type text,
  rating text
);

create table final_project.lbx_studios (
  id serial references final_project.lbx_movies (id),
  studio text
);

create table final_project.lbx_themes (
  id serial references final_project.lbx_movies (id),
  theme text
);

COPY final_project.lbx_movies
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\movies.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_actors
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\actors.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_countries
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\countries.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_crew
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\crew.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_genres
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\genres.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_languages
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\archive\languages.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_releases
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\releases.csv\releases.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_studios
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\studios.csv\studios.csv'
WITH (FORMAT CSV, HEADER);

COPY final_project.lbx_themes
FROM 'C:\Users\Public\WU_CourseLoad\pair-project-oliver-and-nico-main\pair-project-oliver-and-nico-main\Letterboxd\themes.csv\themes.csv'
WITH (FORMAT CSV, HEADER);

CREATE INDEX mov_in
ON final_project.lbx_movies (id)

```