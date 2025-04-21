drop policy "Users can update their own profile" on "public"."profiles";

drop policy "Users can view their own profile" on "public"."profiles";

create policy "Anyone can update profile row"
on "public"."profiles"
as permissive
for update
to public
using (true);


create policy "Anyone can view profile"
on "public"."profiles"
as permissive
for select
to public
using (true);



