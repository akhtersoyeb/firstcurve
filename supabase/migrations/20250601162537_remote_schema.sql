revoke select on table "auth"."schema_migrations" from "postgres";

CREATE TRIGGER new_user_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


grant delete on table "storage"."s3_multipart_uploads" to "postgres";

grant insert on table "storage"."s3_multipart_uploads" to "postgres";

grant references on table "storage"."s3_multipart_uploads" to "postgres";

grant select on table "storage"."s3_multipart_uploads" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads" to "postgres";

grant update on table "storage"."s3_multipart_uploads" to "postgres";

grant delete on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant insert on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant references on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant select on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant update on table "storage"."s3_multipart_uploads_parts" to "postgres";

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Keywords table
create table if not exists keywords (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  keyword text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Search Results table
create table if not exists search_results (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  keyword text not null,
  result_json jsonb not null,
  relevance_score float,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
-- END PRODUCT WORKFLOW TABLES


