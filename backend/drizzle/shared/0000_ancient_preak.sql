CREATE TYPE "shared"."round_draw_status" AS ENUM('N', 'D', 'C', 'T', 'R');--> statement-breakpoint
CREATE TYPE "shared"."round_draw_type" AS ENUM('R', 'M', 'D', 'P', 'E', 'S');--> statement-breakpoint
CREATE TYPE "shared"."round_motions_status" AS ENUM('N', 'I', 'M');--> statement-breakpoint
CREATE TYPE "shared"."round_stage" AS ENUM('P', 'E');--> statement-breakpoint
CREATE TABLE "shared"."adjudicator_adjudicator_conflict" (
	"tournament_id" varchar NOT NULL,
	"adjudicator_a_id" integer NOT NULL,
	"adjudicator_b_id" integer NOT NULL,
	CONSTRAINT "adjudicator_adjudicator_conflict_tournament_id_adjudicator_a_id_adjudicator_b_id_pk" PRIMARY KEY("tournament_id","adjudicator_a_id","adjudicator_b_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."adjudicator_institution_conflict" (
	"tournament_id" varchar NOT NULL,
	"adjudicator_id" integer NOT NULL,
	"institution_id" integer NOT NULL,
	CONSTRAINT "adjudicator_institution_conflict_tournament_id_adjudicator_id_institution_id_pk" PRIMARY KEY("tournament_id","adjudicator_id","institution_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."adjudicator" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"institution_id" integer,
	"breaking" boolean NOT NULL,
	"independent" boolean NOT NULL,
	"adj_core" boolean NOT NULL,
	CONSTRAINT "adjudicator_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."adjudicator_team_conflict" (
	"tournament_id" varchar NOT NULL,
	"adjudicator_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	CONSTRAINT "adjudicator_team_conflict_tournament_id_adjudicator_id_team_id_pk" PRIMARY KEY("tournament_id","adjudicator_id","team_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."break_category" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"seq" integer NOT NULL,
	"break_size" integer NOT NULL,
	"reserve_size" integer NOT NULL,
	"is_general" boolean NOT NULL,
	"priority" integer NOT NULL,
	CONSTRAINT "break_category_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."institution" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "institution_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."round" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"break_category_id" integer,
	"display_name" varchar NOT NULL,
	"starts_at" timestamp,
	"motions_released" boolean NOT NULL,
	"seq" integer NOT NULL,
	"completed" boolean NOT NULL,
	"name" varchar NOT NULL,
	"abbreviation" varchar NOT NULL,
	"stage" "shared"."round_stage" NOT NULL,
	"draw_type" "shared"."round_draw_type" NOT NULL,
	"draw_status" "shared"."round_draw_status" NOT NULL,
	"feedback_weight" numeric NOT NULL,
	"silent" boolean NOT NULL,
	"motions_status" "shared"."round_motions_status" NOT NULL,
	"weight" numeric NOT NULL,
	CONSTRAINT "round_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."speaker_category" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"seq" integer NOT NULL,
	CONSTRAINT "speaker_category_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."speaker_speaker_category" (
	"tournament_id" varchar NOT NULL,
	"speaker_id" integer NOT NULL,
	"speaker_category_id" integer NOT NULL,
	CONSTRAINT "speaker_speaker_category_tournament_id_speaker_id_speaker_category_id_pk" PRIMARY KEY("tournament_id","speaker_id","speaker_category_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."speaker" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"institution_id" integer,
	"team_id" integer NOT NULL,
	"anonymous" boolean NOT NULL,
	"email" varchar,
	CONSTRAINT "speaker_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."team_break_category" (
	"tournament_id" varchar NOT NULL,
	"team_id" integer NOT NULL,
	"break_category_id" integer NOT NULL,
	CONSTRAINT "team_break_category_tournament_id_team_id_break_category_id_pk" PRIMARY KEY("tournament_id","team_id","break_category_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."team_institution_conflict" (
	"tournament_id" varchar NOT NULL,
	"team_id" integer NOT NULL,
	"institution_id" integer NOT NULL,
	CONSTRAINT "team_institution_conflict_tournament_id_team_id_institution_id_pk" PRIMARY KEY("tournament_id","team_id","institution_id")
);
--> statement-breakpoint
CREATE TABLE "shared"."team" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"reference" varchar NOT NULL,
	"short_reference" varchar NOT NULL,
	"institution_id" integer,
	"emoji" varchar(1),
	"code_name" varchar NOT NULL,
	"use_institution_prefix" boolean NOT NULL,
	"short_name" varchar NOT NULL,
	"long_name" varchar NOT NULL,
	CONSTRAINT "team_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
CREATE TABLE "shared"."tournament" (
	"tournament_id" varchar PRIMARY KEY NOT NULL,
	"base_url" varchar NOT NULL,
	"id" integer NOT NULL,
	"slug" varchar NOT NULL,
	"name" varchar NOT NULL,
	"short_name" varchar NOT NULL,
	"token" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "shared"."venue" (
	"tournament_id" varchar NOT NULL,
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	"display_name" varchar NOT NULL,
	"priority" integer NOT NULL,
	CONSTRAINT "venue_tournament_id_id_pk" PRIMARY KEY("tournament_id","id")
);
--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_adjudicator_conflict" ADD CONSTRAINT "adj_adj_conflict_a_fk" FOREIGN KEY ("tournament_id","adjudicator_a_id") REFERENCES "shared"."adjudicator"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_adjudicator_conflict" ADD CONSTRAINT "adj_adj_conflict_b_fk" FOREIGN KEY ("tournament_id","adjudicator_b_id") REFERENCES "shared"."adjudicator"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_institution_conflict" ADD CONSTRAINT "adj_inst_conflict_adj_fk" FOREIGN KEY ("tournament_id","adjudicator_id") REFERENCES "shared"."adjudicator"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_institution_conflict" ADD CONSTRAINT "adj_inst_conflict_inst_fk" FOREIGN KEY ("tournament_id","institution_id") REFERENCES "shared"."institution"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator" ADD CONSTRAINT "adjudicator_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator" ADD CONSTRAINT "adjudicator_institution_fk" FOREIGN KEY ("tournament_id","institution_id") REFERENCES "shared"."institution"("tournament_id","id") ON DELETE set null (institution_id) ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_team_conflict" ADD CONSTRAINT "adj_team_conflict_adj_fk" FOREIGN KEY ("tournament_id","adjudicator_id") REFERENCES "shared"."adjudicator"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."adjudicator_team_conflict" ADD CONSTRAINT "adj_team_conflict_team_fk" FOREIGN KEY ("tournament_id","team_id") REFERENCES "shared"."team"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."break_category" ADD CONSTRAINT "break_category_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."institution" ADD CONSTRAINT "institution_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."round" ADD CONSTRAINT "round_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."round" ADD CONSTRAINT "round_break_category_fk" FOREIGN KEY ("tournament_id","break_category_id") REFERENCES "shared"."break_category"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker_category" ADD CONSTRAINT "speaker_category_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker_speaker_category" ADD CONSTRAINT "speaker_sc_speaker_fk" FOREIGN KEY ("tournament_id","speaker_id") REFERENCES "shared"."speaker"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker_speaker_category" ADD CONSTRAINT "speaker_sc_sc_fk" FOREIGN KEY ("tournament_id","speaker_category_id") REFERENCES "shared"."speaker_category"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker" ADD CONSTRAINT "speaker_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker" ADD CONSTRAINT "speaker_team_fk" FOREIGN KEY ("tournament_id","team_id") REFERENCES "shared"."team"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."speaker" ADD CONSTRAINT "speaker_institution_fk" FOREIGN KEY ("tournament_id","institution_id") REFERENCES "shared"."institution"("tournament_id","id") ON DELETE set null (institution_id) ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team_break_category" ADD CONSTRAINT "team_bc_team_fk" FOREIGN KEY ("tournament_id","team_id") REFERENCES "shared"."team"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team_break_category" ADD CONSTRAINT "team_bc_bc_fk" FOREIGN KEY ("tournament_id","break_category_id") REFERENCES "shared"."break_category"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team_institution_conflict" ADD CONSTRAINT "team_institution_conflict_team_fk" FOREIGN KEY ("tournament_id","team_id") REFERENCES "shared"."team"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team_institution_conflict" ADD CONSTRAINT "team_institution_conflict_institution_fk" FOREIGN KEY ("tournament_id","institution_id") REFERENCES "shared"."institution"("tournament_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team" ADD CONSTRAINT "team_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."team" ADD CONSTRAINT "team_institution_fk" FOREIGN KEY ("tournament_id","institution_id") REFERENCES "shared"."institution"("tournament_id","id") ON DELETE set null (institution_id) ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared"."venue" ADD CONSTRAINT "venue_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "shared"."tournament"("tournament_id") ON DELETE cascade ON UPDATE no action;