create table ingredients (
  id         mediumint not null auto_increment,
  name       varchar(30) not null unique,
  percentage decimal(3, 2) not null,
  type       char(1) not null,   -- L: liquid, D: dairy, C: coffee
  color      varchar(15) not null,
  cost       decimal(6, 2) not null,
  qtd        mediumint,
  lightcolor boolean,
  primary key(id)
);

create table orders (
  id            int not null auto_increment,
  name          varchar(255) not null,
  email         varchar(255),
  address       varchar(1024),
  city          varchar(100),
  state         varchar(50),
  zip           varchar(30),
  delivery_cost decimal(10, 2) not null,
  tax_cost      decimal(10, 2) not null,
  total         decimal(10, 2) not null,
  order_date    timestamp default now()
  primary key (id)
);

create table order_items (
  order_id      int not null,
  num           smallint not null,
  name          varchar(255),
  description   varchar(2048),
  size          char(1) not null,   -- S: small, M: medium, L: large
  total_cost    decimal(10, 2) not null,
  primary key (order_id, num),
  foreign key (order_id) references orders (id)
);

create table item_ingredients (
  order_id      int not null,
  item_num      smallint not null,
  ingredient_id mediumint not null,
  primary key (order_id, item_num, ingredient_id),
  foreign key (order_id, item_num) references order_items (order_id, num),
  foreign key (ingredient_id) references ingredients (id)
);

insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ('Espresso',        0.0, 'C', '#000000', 4.0, 0, false );
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Brewed (strong)', 0.0, 'C', '#610B0B', 3.0, 0, false);
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Brewed (weak)',   0.0, 'C', '#8A4B08', 3.0, 0, false);
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Cream',           0.0, 'D', '#F5F6CE', 4.0, 0, true);
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Milk',            0.0, 'D', '#FAFAFA', 2.0, 0, true );
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Whipped milk',    0.0, 'D', '#F2F2F2', 3.5, 0, true );
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Water',           0.0, 'L', '#20A0FF', 0.0, 0, true );
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Chocolate',       0.0, 'L', '#8A4B08', 5.0, 0, false);
insert into ingredients ( name, percentage, type, color, cost, qtd, lightcolor )
  values ( 'Whisky',          0.0, 'L', '#FFBF00', 12.0, 0, true);
