create database heodat;

create table moneys (
	-- indentity cho no tu tang ma khong biet tren ms sql server chay dc k
    id int identity(1,1) primary key,
    -- Ten cua khoan chi hoac tieu
    name varchar(255) not null,
    -- Gia tri, am neu la khoan tieu
    value int not null,
    -- 0: khong dinh ki, 1: hang tuan, 2 hang thang, 3: hang nam
    per int default 0,
    dat date not null
);

insert into moneys(name, value, per, dat) values('Nap game', 300, 0, '1/1/2000')
select * from moneys;