create schema office_inventarisation collate utf8mb4_general_ci;
use office_inventarisation;
create table categories
(
  id          int auto_increment,
  title       VARCHAR(50) not null,
  description TEXT        null,
  constraint categories_pk
    primary key (id)
);
create table locations
(
  id          int auto_increment,
  title       VARCHAR(50) not null,
  description TEXT        null,
  constraint locations_pk
    primary key (id)
);
create table items
(
  id          int auto_increment,
  name        VARCHAR(50) not null,
  category_id int         not null,
  constraint items_pk
    primary key (id),
  constraint items_categories_id_fk
    foreign key (category_id) references categories (id)
);
alter table items
  add location_id int not null;
alter table items
  add description TEXT null;
alter table items
  add image TEXT null;
alter table items
  add constraint items_locations_id_fk
    foreign key (location_id) references locations (id);
alter table items
  modify name varchar(50) not null after location_id;

INSERT INTO office_inventarisation.categories (title, description) VALUES ('furniture', null);
INSERT INTO office_inventarisation.categories (title, description) VALUES ('technic', 'be careful with this');
INSERT INTO office_inventarisation.categories (title, description) VALUES ('appliances', null);

INSERT INTO office_inventarisation.locations (title, description) VALUES ('office 1', 'near director room');
INSERT INTO office_inventarisation.locations (title, description) VALUES ('director room', null);
INSERT INTO office_inventarisation.locations (title, description) VALUES ('hall', null);

INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (2, 3, 'PC', 'this is slow one', null);
INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (2, 1, 'notebook', 'this is much better than firs one', null);
INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (2, 2, 'M3 PRO macbook', 'strongest laptop ever', null);
INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (1, 3, 'sofa', '<null>', null);
INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (1, 1, 'table', null, null);
INSERT INTO office_inventarisation.items (category_id, location_id, name, description, image) VALUES (3, 1, 'coffee machine', null, null);