drop database if exists cafes;
create database cafes;
use cafes;

drop table if exists cafes;
drop table if exists business_hours;
drop table if exists users;
drop table if exists favorites;

create table cafes (
cafe_id int auto_increment,
cafe_name varchar(255) NOT NULL,
location varchar(255) NOT NULL,
cost varchar(255),
wifi boolean,
noise varchar(255),
food boolean,
`group` boolean,
gluten boolean,
vegetarian boolean,
pets boolean,
primary key (cafe_id)
);

create table business_hours (
	cafe_id int NOT NULL,
    `day` int,
    open_time time,
    close_time time,
    foreign key (cafe_id) references cafes(cafe_id)
);


create table users (
user_id int auto_increment,
user_name varchar(255) not null,
first_name varchar(255),
last_name varchar(255),
email varchar(255) unique,
primary key (user_id)

);


create table favorites (
	cafe_id int,
    user_id int,
    foreign key (cafe_id) references cafes(cafe_id),
    foreign key (user_id) references users(user_id)
);


insert into cafes(cafe_name, location, cost, wifi, noise, food, `group`, gluten, vegetarian, pets) 
values 
('minas','nørrebro','low',true,'middle',true,false,true,true,false);

insert into business_hours (cafe_id, `day`, open_time, close_time)
values
(1,0,100000,160000),
(1,1,080000,170000),
(1,2,080000,170000),
(1,3,080000,170000),
(1,4,080000,170000),
(1,5,080000,170000),
(1,6,100000,160000);

insert into users(user_name,first_name,last_name,email)
values
('jtl','josef','tonnesen-lucas','jtl@email.com'),
('jens','jens','nielsen','jens@email.com');

insert into favorites(user_id, cafe_id)
values (1,1);