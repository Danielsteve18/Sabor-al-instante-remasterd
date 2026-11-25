-- 0004_handle_new_user.sql · SAB-14 · Crea la fila en profiles al registrarse un usuario
-- El rol siempre es 'cliente': nunca se toma de los datos que envía el usuario.
-- Re-ejecutable: "create or replace" y "drop trigger if exists".
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
insert into public.profiles (id, full_name, role)
values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'cliente')
    on conflict (id) do nothing;
return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
