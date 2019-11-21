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
