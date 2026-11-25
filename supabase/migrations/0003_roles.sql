-- 0003_roles.sql · SAB-17 · Rol staff, helpers de rol y asignación solo por admin

-- ============ Valores permitidos de profiles.role ============
-- 0001 solo permitía cliente/admin; se agrega staff.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('cliente','staff','admin'));

-- ============ Helpers de rol ============
-- my_role() e is_admin() ya existen (0002_rls.sql).
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
select coalesce(public.my_role() in ('staff','admin'), false);
$$;

-- ============ Asignación de roles: solo admin ============
-- La política profiles_update (0002) ya impide que un usuario cambie su propio rol.
-- Esta función es el único camino documentado para asignar roles y valida al llamante.
create or replace function public.set_user_role(target_user uuid, new_role text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Solo un admin puede asignar roles' using errcode = '42501';
  end if;

  if new_role not in ('cliente','staff','admin') then
    raise exception 'Rol no válido: %', new_role using errcode = '22023';
  end if;

  if target_user = (select auth.uid()) and new_role <> 'admin' then
    raise exception 'Un admin no puede quitarse su propio rol' using errcode = '42501';
  end if;

  update public.profiles set role = new_role where id = target_user;

  if not found then
    raise exception 'No existe un perfil para el usuario %', target_user using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.set_user_role(uuid, text) from public, anon;
grant execute on function public.set_user_role(uuid, text) to authenticated;
