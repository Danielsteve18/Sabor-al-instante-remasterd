-- 0002_rls.sql · SAB-9 · Funciones de rol y políticas RLS

-- ============ Funciones de rol ============
create or replace function public.my_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
select role from public.profiles where id = (select auth.uid());
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
select coalesce(public.my_role() = 'admin', false);
$$;

-- ============ Activar RLS ============
alter table public.profiles         enable row level security;
alter table public.categories       enable row level security;
alter table public.dishes           enable row level security;
alter table public.daily_offers     enable row level security;
alter table public.reservations     enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials     enable row level security;
alter table public.posts            enable row level security;
alter table public.schedule         enable row level security;

-- ============ profiles ============
-- El usuario ve y edita su perfil, pero no puede cambiarse el rol.
create policy profiles_select on public.profiles for select to authenticated
                                                         using (id = (select auth.uid()) or public.is_admin());
create policy profiles_insert on public.profiles for insert to authenticated
  with check (id = (select auth.uid()) and role = 'cliente');
create policy profiles_update on public.profiles for update to authenticated
                                                                using (id = (select auth.uid()) or public.is_admin())
                                                     with check (public.is_admin() or (id = (select auth.uid()) and role = public.my_role()));
create policy profiles_delete on public.profiles for delete to authenticated
  using (public.is_admin());

-- ============ Catálogo: lectura pública, escritura admin ============
create policy categories_select on public.categories for select to anon, authenticated
                                                                                                                         using (active = true or public.is_admin());
create policy categories_admin on public.categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy dishes_select on public.dishes for select to anon, authenticated
                                                            using (true);
create policy dishes_admin on public.dishes for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy daily_offers_select on public.daily_offers for select to anon, authenticated
                                                                        using (active = true or public.is_admin());
create policy daily_offers_admin on public.daily_offers for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy schedule_select on public.schedule for select to anon, authenticated
                                                                using (true);
create policy schedule_admin on public.schedule for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ============ Contenido publicado ============
create policy testimonials_select on public.testimonials for select to anon, authenticated
                                                                        using (approved = true or user_id = (select auth.uid()) or public.is_admin());
create policy testimonials_admin on public.testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy posts_select on public.posts for select to anon, authenticated
                                                          using (published = true or public.is_admin());
create policy posts_admin on public.posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ============ reservations ============
create policy reservations_select on public.reservations for select to authenticated
                                                                        using (user_id = (select auth.uid()) or public.is_admin());
create policy reservations_insert on public.reservations for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy reservations_update_admin on public.reservations for update to authenticated
                                                                              using (public.is_admin()) with check (public.is_admin());
create policy reservations_cancel_own on public.reservations for update to authenticated
                                                                     using (user_id = (select auth.uid()) and status = 'pendiente')
                                                                 with check (user_id = (select auth.uid()) and status = 'cancelada');
create policy reservations_delete on public.reservations for delete to authenticated
  using (public.is_admin());

-- ============ contact_messages ============
create policy contact_select on public.contact_messages for select to authenticated
                                                                                                                                    using (public.is_admin());
create policy contact_insert on public.contact_messages for insert to authenticated
  with check (true);
create policy contact_update on public.contact_messages for update to authenticated
                                                                       using (public.is_admin()) with check (public.is_admin());
create policy contact_delete on public.contact_messages for delete to authenticated
  using (public.is_admin());
