CREATE TYPE "public"."chat_type" AS ENUM('channel_chat', 'group_chat', 'private_chat');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" "chat_type" DEFAULT 'private_chat' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chats_users" (
	"user_id" uuid NOT NULL,
	"chat_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now(),
	CONSTRAINT "chats_users_user_id_chat_id_pk" PRIMARY KEY("user_id","chat_id")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"chat_id" uuid NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "chats_users" ADD CONSTRAINT "chats_users_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chats_users_user_id_idx" ON "chats_users" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chats_users_chat_id_idx" ON "chats_users" USING btree ("chat_id");