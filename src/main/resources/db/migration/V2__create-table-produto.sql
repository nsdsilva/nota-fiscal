create table produto (

                    id serial primary key,
                    codigo bigint not null,
                    descricao varchar(100) not null,
                    valor_unitario double precision not null
);