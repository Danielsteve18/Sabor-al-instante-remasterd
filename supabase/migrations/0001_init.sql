-- 0001_init.sql · ELE-8 · Migración inicial del esquema

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'cliente' check (role in ('cliente','admin')),
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  active boolean not null default true
);

create table if not exists dishes (
  id bigint generated always as identity primary key,
  category_id bigint not null references categories(id) on delete restrict,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  available boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists dishes_category_id_idx on dishes(category_id);

create table if not exists daily_offers (
  id bigint generated always as identity primary key,
  dish_id bigint not null references dishes(id) on delete cascade,
  offer_date date not null,
  offer_price numeric(10,2) check (offer_price >= 0),
  note text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (dish_id, offer_date)
);
create index if not exists daily_offers_date_idx on daily_offers(offer_date);

create table if not exists reservations (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null, -- null = invitado
  guest_name text,
  guest_phone text,
  reserved_date date not null,
  reserved_time time not null,
  people int not null check (people between 1 and 20),
  status text not null default 'pendiente'
    check (status in ('pendiente','confirmada','cancelada')),
  created_at timestamptz not null default now(),
  constraint reservations_owner_chk check (
    user_id is not null
    or (guest_name is not null and guest_phone is not null)
  )
);
create index if not exists reservations_slot_idx
  on reservations(reserved_date, reserved_time)
  where status <> 'cancelada';
create index if not exists reservations_user_idx on reservations(user_id);

create or replace view reservation_slot_usage as
select reserved_date, reserved_time,
       count(*) as reservations_count,
       sum(people) as people_total
from reservations
where status <> 'cancelada'
group by reserved_date, reserved_time;

create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id bigint generated always as identity primary key,
  author_id uuid references profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists posts_published_idx on posts(published, published_at desc);

create table if not exists schedule (
  id bigint generated always as identity primary key,
  day_of_week smallint not null unique check (day_of_week between 0 and 6), -- 0 = domingo
  open_time time,
  close_time time,
  closed boolean not null default false,
  constraint schedule_hours_chk check (
    closed or (open_time is not null and close_time is not null)
  )
);
