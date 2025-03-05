CREATE TABLE "alicization"."accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"is_verified" boolean DEFAULT false,
	"is_suspended" boolean DEFAULT false,
	"suspended_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "accounts_uid_unique" UNIQUE("uid"),
	CONSTRAINT "accounts_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "alicization"."accounts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"email" text,
	"phone_no" text,
	"display_name" text DEFAULT 'display name',
	"avatar" text DEFAULT 'default-avatar.webp',
	"bio" text,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"group" text DEFAULT 'general',
	"text" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "genres_text_unique" UNIQUE("text")
);
--> statement-breakpoint
ALTER TABLE "alicization"."genres" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"action" text NOT NULL,
	"resource" text NOT NULL,
	"conditions" json,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."permissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"tier" text DEFAULT 'user' NOT NULL,
	"name" text DEFAULT 'user' NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "alicization"."roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."state_of_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."state_of_teams" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"bio" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."teams" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."genres_of_titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "alicization"."titles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"sub_name" text,
	"description" text,
	"keywords" text,
	"poster" text NOT NULL,
	"category" text DEFAULT 'anime' NOT NULL,
	"dubbed" text DEFAULT 'japan' NOT NULL,
	"status" text DEFAULT 'airing' NOT NULL,
	"studio" text,
	"source" text DEFAULT 'etc',
	"season_no" integer DEFAULT 1 NOT NULL,
	"link" text,
	"is_active" boolean DEFAULT true,
	"released_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."titles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."tracks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"poster" text,
	"episode_no" integer DEFAULT 1 NOT NULL,
	"duration" real DEFAULT 0 NOT NULL,
	"skip" json,
	"file_path" text NOT NULL,
	"file_type" text NOT NULL,
	"file_size" real NOT NULL,
	"chunk_size" real DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."tracks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "alicization"."watch_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" integer NOT NULL,
	"track_id" integer NOT NULL,
	"progress" real,
	"is_completed" boolean DEFAULT false,
	"watched_at" timestamp (6) with time zone DEFAULT now(),
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "alicization"."watch_history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "alicization"."profiles" ADD CONSTRAINT "profiles_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "alicization"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."permissions" ADD CONSTRAINT "permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "alicization"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."roles" ADD CONSTRAINT "roles_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "alicization"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."state_of_teams" ADD CONSTRAINT "state_of_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "alicization"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."state_of_teams" ADD CONSTRAINT "state_of_teams_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "alicization"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."state_of_teams" ADD CONSTRAINT "state_of_teams_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "alicization"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."genres_of_titles" ADD CONSTRAINT "genres_of_titles_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "alicization"."titles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."genres_of_titles" ADD CONSTRAINT "genres_of_titles_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "alicization"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."tracks" ADD CONSTRAINT "tracks_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "alicization"."titles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."watch_history" ADD CONSTRAINT "watch_history_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "alicization"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alicization"."watch_history" ADD CONSTRAINT "watch_history_track_id_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "alicization"."tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_uid_index" ON "alicization"."accounts" USING btree ("uid");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_username_index" ON "alicization"."accounts" USING btree ("username");--> statement-breakpoint
CREATE INDEX "permissions_action_index" ON "alicization"."permissions" USING btree ("action");--> statement-breakpoint
CREATE INDEX "permissions_resource_index" ON "alicization"."permissions" USING btree ("resource");--> statement-breakpoint
CREATE INDEX "roles_tier_index" ON "alicization"."roles" USING btree ("tier");--> statement-breakpoint
CREATE UNIQUE INDEX "roles_name_index" ON "alicization"."roles" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "teams_name_index" ON "alicization"."teams" USING btree ("name");--> statement-breakpoint
CREATE INDEX "titles_name_index" ON "alicization"."titles" USING btree ("name");--> statement-breakpoint
CREATE INDEX "titles_category_index" ON "alicization"."titles" USING btree ("category");--> statement-breakpoint
CREATE INDEX "titles_dubbed_index" ON "alicization"."titles" USING btree ("dubbed");--> statement-breakpoint
CREATE INDEX "titles_status_index" ON "alicization"."titles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "tracks_title_index" ON "alicization"."tracks" USING btree ("title");--> statement-breakpoint
CREATE INDEX "tracks_episode_no_index" ON "alicization"."tracks" USING btree ("episode_no");