import { Migration } from '@mikro-orm/migrations';

export class Migration20250725020625 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "custom" ("id" text not null, "brand" text not null, "is_featured" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "custom_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_custom_deleted_at" ON "custom" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "custom" cascade;`);
  }

}
