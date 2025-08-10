drop policy "Enable insert for authenticated users only" on "public"."google_searches";

drop policy "Enable read access for authenticated users" on "public"."google_searches";

revoke delete on table "public"."google_searches" from "anon";

revoke insert on table "public"."google_searches" from "anon";

revoke references on table "public"."google_searches" from "anon";

revoke select on table "public"."google_searches" from "anon";

revoke trigger on table "public"."google_searches" from "anon";

revoke truncate on table "public"."google_searches" from "anon";

revoke update on table "public"."google_searches" from "anon";

revoke delete on table "public"."google_searches" from "authenticated";

revoke insert on table "public"."google_searches" from "authenticated";

revoke references on table "public"."google_searches" from "authenticated";

revoke select on table "public"."google_searches" from "authenticated";

revoke trigger on table "public"."google_searches" from "authenticated";

revoke truncate on table "public"."google_searches" from "authenticated";

revoke update on table "public"."google_searches" from "authenticated";

revoke delete on table "public"."google_searches" from "service_role";

revoke insert on table "public"."google_searches" from "service_role";

revoke references on table "public"."google_searches" from "service_role";

revoke select on table "public"."google_searches" from "service_role";

revoke trigger on table "public"."google_searches" from "service_role";

revoke truncate on table "public"."google_searches" from "service_role";

revoke update on table "public"."google_searches" from "service_role";

revoke delete on table "public"."keywords" from "anon";

revoke insert on table "public"."keywords" from "anon";

revoke references on table "public"."keywords" from "anon";

revoke select on table "public"."keywords" from "anon";

revoke trigger on table "public"."keywords" from "anon";

revoke truncate on table "public"."keywords" from "anon";

revoke update on table "public"."keywords" from "anon";

revoke delete on table "public"."keywords" from "authenticated";

revoke insert on table "public"."keywords" from "authenticated";

revoke references on table "public"."keywords" from "authenticated";

revoke select on table "public"."keywords" from "authenticated";

revoke trigger on table "public"."keywords" from "authenticated";

revoke truncate on table "public"."keywords" from "authenticated";

revoke update on table "public"."keywords" from "authenticated";

revoke delete on table "public"."keywords" from "service_role";

revoke insert on table "public"."keywords" from "service_role";

revoke references on table "public"."keywords" from "service_role";

revoke select on table "public"."keywords" from "service_role";

revoke trigger on table "public"."keywords" from "service_role";

revoke truncate on table "public"."keywords" from "service_role";

revoke update on table "public"."keywords" from "service_role";

revoke delete on table "public"."search_results" from "anon";

revoke insert on table "public"."search_results" from "anon";

revoke references on table "public"."search_results" from "anon";

revoke select on table "public"."search_results" from "anon";

revoke trigger on table "public"."search_results" from "anon";

revoke truncate on table "public"."search_results" from "anon";

revoke update on table "public"."search_results" from "anon";

revoke delete on table "public"."search_results" from "authenticated";

revoke insert on table "public"."search_results" from "authenticated";

revoke references on table "public"."search_results" from "authenticated";

revoke select on table "public"."search_results" from "authenticated";

revoke trigger on table "public"."search_results" from "authenticated";

revoke truncate on table "public"."search_results" from "authenticated";

revoke update on table "public"."search_results" from "authenticated";

revoke delete on table "public"."search_results" from "service_role";

revoke insert on table "public"."search_results" from "service_role";

revoke references on table "public"."search_results" from "service_role";

revoke select on table "public"."search_results" from "service_role";

revoke trigger on table "public"."search_results" from "service_role";

revoke truncate on table "public"."search_results" from "service_role";

revoke update on table "public"."search_results" from "service_role";

alter table "public"."google_searches" drop constraint "google-searches_user_id_fkey";

alter table "public"."keywords" drop constraint "keywords_product_id_fkey";

alter table "public"."search_results" drop constraint "search_results_product_id_fkey";

alter table "public"."google_searches" drop constraint "google-searches_pkey";

alter table "public"."keywords" drop constraint "keywords_pkey";

alter table "public"."search_results" drop constraint "search_results_pkey";

drop index if exists "public"."google-searches_pkey";

drop index if exists "public"."keywords_pkey";

drop index if exists "public"."search_results_pkey";

drop table "public"."google_searches";

drop table "public"."keywords";

drop table "public"."search_results";

create table "public"."product_keywords" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "value" text not null,
    "product_id" bigint,
    "has_search_results" boolean not null default false
);


alter table "public"."product_keywords" enable row level security;

create table "public"."product_search_results" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "link" text,
    "snippet" text,
    "product_id" bigint,
    "product_keyword_id" bigint
);


alter table "public"."product_search_results" enable row level security;

create table "public"."user_search_log" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid(),
    "product_id" bigint,
    "keyword_id" bigint
);


alter table "public"."user_search_log" enable row level security;

alter table "public"."products" add column "slug" text not null;

alter table "public"."products" add column "user_id" uuid not null default auth.uid();

alter table "public"."products" alter column "created_at" set default now();

alter table "public"."products" alter column "created_at" set not null;

alter table "public"."products" alter column "description" set not null;

alter table "public"."products" alter column "id" drop default;

alter table "public"."products" alter column "id" add generated by default as identity;

alter table "public"."products" alter column "id" set data type bigint using "id"::bigint;

alter table "public"."products" enable row level security;

CREATE UNIQUE INDEX product_keywords_pkey ON public.product_keywords USING btree (id);

CREATE UNIQUE INDEX product_search_results_pkey ON public.product_search_results USING btree (id);

CREATE UNIQUE INDEX products_id_key ON public.products USING btree (id);

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);

CREATE UNIQUE INDEX user_search_log_pkey ON public.user_search_log USING btree (id);

alter table "public"."product_keywords" add constraint "product_keywords_pkey" PRIMARY KEY using index "product_keywords_pkey";

alter table "public"."product_search_results" add constraint "product_search_results_pkey" PRIMARY KEY using index "product_search_results_pkey";

alter table "public"."user_search_log" add constraint "user_search_log_pkey" PRIMARY KEY using index "user_search_log_pkey";

alter table "public"."product_keywords" add constraint "product_keywords_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE not valid;

alter table "public"."product_keywords" validate constraint "product_keywords_product_id_fkey";

alter table "public"."product_search_results" add constraint "product_search_results_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE not valid;

alter table "public"."product_search_results" validate constraint "product_search_results_product_id_fkey";

alter table "public"."product_search_results" add constraint "product_search_results_product_keyword_id_fkey" FOREIGN KEY (product_keyword_id) REFERENCES product_keywords(id) ON DELETE CASCADE not valid;

alter table "public"."product_search_results" validate constraint "product_search_results_product_keyword_id_fkey";

alter table "public"."products" add constraint "products_id_key" UNIQUE using index "products_id_key";

alter table "public"."products" add constraint "products_slug_key" UNIQUE using index "products_slug_key";

alter table "public"."products" add constraint "products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_user_id_fkey";

alter table "public"."user_search_log" add constraint "user_search_log_keyword_id_fkey" FOREIGN KEY (keyword_id) REFERENCES product_keywords(id) ON DELETE SET NULL not valid;

alter table "public"."user_search_log" validate constraint "user_search_log_keyword_id_fkey";

alter table "public"."user_search_log" add constraint "user_search_log_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL not valid;

alter table "public"."user_search_log" validate constraint "user_search_log_product_id_fkey";

alter table "public"."user_search_log" add constraint "user_search_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_search_log" validate constraint "user_search_log_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_product_slug(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    base_slug TEXT := regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g');
    final_slug TEXT := base_slug;
    suffix TEXT;
    exists_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO exists_count FROM products WHERE slug = final_slug;

    IF exists_count > 0 THEN
        suffix := substr(md5(random()::text), 1, 6);
        final_slug := base_slug || '-' || suffix;
    END IF;

    RETURN final_slug;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_product_slug()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only update slug if inserting or if name has changed
  IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE' AND NEW.name IS DISTINCT FROM OLD.name) THEN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
      NEW.slug := generate_product_slug(NEW.name);
    END IF;
  END IF;
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."product_keywords" to "anon";

grant insert on table "public"."product_keywords" to "anon";

grant references on table "public"."product_keywords" to "anon";

grant select on table "public"."product_keywords" to "anon";

grant trigger on table "public"."product_keywords" to "anon";

grant truncate on table "public"."product_keywords" to "anon";

grant update on table "public"."product_keywords" to "anon";

grant delete on table "public"."product_keywords" to "authenticated";

grant insert on table "public"."product_keywords" to "authenticated";

grant references on table "public"."product_keywords" to "authenticated";

grant select on table "public"."product_keywords" to "authenticated";

grant trigger on table "public"."product_keywords" to "authenticated";

grant truncate on table "public"."product_keywords" to "authenticated";

grant update on table "public"."product_keywords" to "authenticated";

grant delete on table "public"."product_keywords" to "service_role";

grant insert on table "public"."product_keywords" to "service_role";

grant references on table "public"."product_keywords" to "service_role";

grant select on table "public"."product_keywords" to "service_role";

grant trigger on table "public"."product_keywords" to "service_role";

grant truncate on table "public"."product_keywords" to "service_role";

grant update on table "public"."product_keywords" to "service_role";

grant delete on table "public"."product_search_results" to "anon";

grant insert on table "public"."product_search_results" to "anon";

grant references on table "public"."product_search_results" to "anon";

grant select on table "public"."product_search_results" to "anon";

grant trigger on table "public"."product_search_results" to "anon";

grant truncate on table "public"."product_search_results" to "anon";

grant update on table "public"."product_search_results" to "anon";

grant delete on table "public"."product_search_results" to "authenticated";

grant insert on table "public"."product_search_results" to "authenticated";

grant references on table "public"."product_search_results" to "authenticated";

grant select on table "public"."product_search_results" to "authenticated";

grant trigger on table "public"."product_search_results" to "authenticated";

grant truncate on table "public"."product_search_results" to "authenticated";

grant update on table "public"."product_search_results" to "authenticated";

grant delete on table "public"."product_search_results" to "service_role";

grant insert on table "public"."product_search_results" to "service_role";

grant references on table "public"."product_search_results" to "service_role";

grant select on table "public"."product_search_results" to "service_role";

grant trigger on table "public"."product_search_results" to "service_role";

grant truncate on table "public"."product_search_results" to "service_role";

grant update on table "public"."product_search_results" to "service_role";

grant delete on table "public"."user_search_log" to "anon";

grant insert on table "public"."user_search_log" to "anon";

grant references on table "public"."user_search_log" to "anon";

grant select on table "public"."user_search_log" to "anon";

grant trigger on table "public"."user_search_log" to "anon";

grant truncate on table "public"."user_search_log" to "anon";

grant update on table "public"."user_search_log" to "anon";

grant delete on table "public"."user_search_log" to "authenticated";

grant insert on table "public"."user_search_log" to "authenticated";

grant references on table "public"."user_search_log" to "authenticated";

grant select on table "public"."user_search_log" to "authenticated";

grant trigger on table "public"."user_search_log" to "authenticated";

grant truncate on table "public"."user_search_log" to "authenticated";

grant update on table "public"."user_search_log" to "authenticated";

grant delete on table "public"."user_search_log" to "service_role";

grant insert on table "public"."user_search_log" to "service_role";

grant references on table "public"."user_search_log" to "service_role";

grant select on table "public"."user_search_log" to "service_role";

grant trigger on table "public"."user_search_log" to "service_role";

grant truncate on table "public"."user_search_log" to "service_role";

grant update on table "public"."user_search_log" to "service_role";

create policy "Enable all for authenticated users only"
on "public"."product_keywords"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable all for authenticated users only"
on "public"."product_search_results"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."products"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."products"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update for users based on user_id"
on "public"."products"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."products"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."user_search_log"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable users to view their own data only"
on "public"."user_search_log"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


CREATE TRIGGER trigger_set_product_slug BEFORE INSERT OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION set_product_slug();


