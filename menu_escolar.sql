drop table if exists Schools;
create table Schools(
	id integer NOT NULL primary key,
	name varchar (45) NOT NULL,
	email varchar (45) NOT NULL,
	password varchar (45) NOT NULL
);


drop table if exists Orders;
create table Orders(
	id integer NOT NULL primary key,
	date date NOT NULL,
	is_rectified boolean NOT NULL,
	observations text 
	school_id integer NOT NULL,
	vegetarian integer NOT NULL,
	vegetarian_real integer NOT NULL,
	celiac integer NOT NULL,
	celiac_real integer NOT NULL,
	standard integer NOT NULL,
	standar_real integer NOT NULL,
	caloric integer NOT NULL,
	caloric_real integer NOT NULL,
	ethnic integer NOT NULL,
	ethnic_real integerNOT NULL
REFERENCE 
	
);