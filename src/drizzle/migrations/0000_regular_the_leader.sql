CREATE TABLE "accounts_with_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"accountId" integer NOT NULL,
	"roleId" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "accounts_with_roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_suspended" boolean DEFAULT false NOT NULL,
	"suspended_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "accounts_uid_unique" UNIQUE("uid"),
	CONSTRAINT "accounts_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"email" text NOT NULL,
	"phone_no" text NOT NULL,
	"display_name" text DEFAULT 'display name' NOT NULL,
	"avatar" text DEFAULT 'default-avatar.webp' NOT NULL,
	"bio" text,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "commons" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "commons" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"action" text NOT NULL,
	"resource" text NOT NULL,
	"conditions" json,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "permissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"tier" text DEFAULT 'user' NOT NULL,
	"name" text DEFAULT 'user' NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"group" text DEFAULT 'general' NOT NULL,
	"text" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "genres_text_unique" UNIQUE("text")
);
--> statement-breakpoint
ALTER TABLE "genres" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "genres_with_titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "titles" (
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
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "titles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "tracks" (
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
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "tracks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "watch_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" integer NOT NULL,
	"track_id" integer NOT NULL,
	"progress" real DEFAULT 0 NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"watched_at" timestamp (6) with time zone DEFAULT now(),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "watch_history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "accounts_with_roles" ADD CONSTRAINT "accounts_with_roles_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts_with_roles" ADD CONSTRAINT "accounts_with_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genres_with_titles" ADD CONSTRAINT "genres_with_titles_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "public"."titles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genres_with_titles" ADD CONSTRAINT "genres_with_titles_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "public"."titles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_track_id_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_uid_index" ON "accounts" USING btree ("uid");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_username_index" ON "accounts" USING btree ("username");--> statement-breakpoint
CREATE INDEX "permissions_action_index" ON "permissions" USING btree ("action");--> statement-breakpoint
CREATE INDEX "permissions_resource_index" ON "permissions" USING btree ("resource");--> statement-breakpoint
CREATE INDEX "roles_tier_index" ON "roles" USING btree ("tier");--> statement-breakpoint
CREATE UNIQUE INDEX "roles_name_index" ON "roles" USING btree ("name");--> statement-breakpoint
CREATE INDEX "titles_name_index" ON "titles" USING btree ("name");--> statement-breakpoint
CREATE INDEX "titles_category_index" ON "titles" USING btree ("category");--> statement-breakpoint
CREATE INDEX "titles_dubbed_index" ON "titles" USING btree ("dubbed");--> statement-breakpoint
CREATE INDEX "titles_status_index" ON "titles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "tracks_title_index" ON "tracks" USING btree ("title");--> statement-breakpoint
CREATE INDEX "tracks_episode_no_index" ON "tracks" USING btree ("episode_no");