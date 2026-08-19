import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1787110235276 implements MigrationInterface {
    name = 'Migrations1787110235276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ag_prop_collections" ("id" BIGSERIAL NOT NULL, "member_id" bigint NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_359eec5e92744290a3329d2516b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ag_service_areas" ("id" BIGSERIAL NOT NULL, "area_name" text NOT NULL, "location_id" bigint NOT NULL, "gcs_id" geometry(Point,4326), "country" text NOT NULL, "region" text, "state" text NOT NULL, "barangay" text, "city" text NOT NULL, "postal_code" text NOT NULL, "address" text NOT NULL, "radius_km" integer NOT NULL DEFAULT '10', CONSTRAINT "PK_7d29c5082a93ebd530081eae41d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_reviews_class_enum" AS ENUM('AGENCY', 'PROPERTY')`);
        await queryRunner.query(`CREATE TYPE "public"."ag_reviews_status_enum" AS ENUM('PUBLISH', 'FLAG', 'REMOVE')`);
        await queryRunner.query(`CREATE TABLE "ag_reviews" ("id" BIGSERIAL NOT NULL, "agency_id" bigint NOT NULL, "property_id" bigint, "is_anonymous" boolean NOT NULL, "reviewer_id" text, "full_name" text NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "class" "public"."ag_reviews_class_enum" NOT NULL, "status" "public"."ag_reviews_status_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_68b984adc7791e4583ceefef7fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_organizations" ("id" text NOT NULL, "name" text NOT NULL, "slug" text NOT NULL, "logo" text, "metadata" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_2576793bcb6040ae05a72cf36a5" UNIQUE ("slug"), CONSTRAINT "PK_5e95e6a4f7df305dff14c91e613" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_org_roles" ("id" text NOT NULL, "organization_id" text NOT NULL, "role" character varying NOT NULL, "permission" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_b00834714879b4948fa42d792ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_properties_property_type_enum" AS ENUM('FARM', 'LAND', 'HOUSE', 'CONDO', 'APARTMENT', 'TOWNHOUSE', 'WAREHOUSE', 'OFFICE', 'COMMERCIAL', 'CONDOTEL')`);
        await queryRunner.query(`CREATE TYPE "public"."ag_properties_property_status_enum" AS ENUM('AVAILABLE', 'RESERVED', 'SOLD', 'RENTED')`);
        await queryRunner.query(`CREATE TABLE "ag_properties" ("id" BIGSERIAL NOT NULL, "prop_id" text NOT NULL, "collection_id" bigint NOT NULL, "sort" integer NOT NULL, "slug" text NOT NULL, "posted_by_id" text NOT NULL, "agency_id" bigint NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "property_type" "public"."ag_properties_property_type_enum" NOT NULL DEFAULT 'LAND', "property_status" "public"."ag_properties_property_status_enum" NOT NULL DEFAULT 'AVAILABLE', "gcs_id" geometry(Point,4326), "location_id" bigint NOT NULL, "country" text NOT NULL, "region" text, "state" text NOT NULL, "barangay" text, "city" text NOT NULL, "postal_code" text NOT NULL, "address" text NOT NULL, "views_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_222b9c3f666e17d86c2076878db" UNIQUE ("prop_id"), CONSTRAINT "UQ_ce117c9cc71cef2c420bf85e8d0" UNIQUE ("slug"), CONSTRAINT "PK_a356e1ceeed0557d5ffd1a984a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."locations_class_enum" AS ENUM('COUNTRY', 'REGION', 'PROVINCE', 'CITY', 'BARANGAY')`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" BIGSERIAL NOT NULL, "parent_id" bigint, "class" "public"."locations_class_enum" NOT NULL, "name" text NOT NULL, "gcs_id" geometry(Point,4326), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_org_members" ("id" text NOT NULL, "user_id" text NOT NULL, "organization_id" text NOT NULL, "role" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_2f88920547a3ebfb6846740851a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ag_prop_listing_promotions" ("id" BIGSERIAL NOT NULL, "property_id" bigint NOT NULL, "starts_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ends_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6958c83c239ca13f8b6e0dd31fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."iam_org_invitations_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "iam_org_invitations" ("id" text NOT NULL, "email" text NOT NULL, "organization_id" text NOT NULL, "role" text, "status" "public"."iam_org_invitations_status_enum" NOT NULL DEFAULT 'pending', "invited_by" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_db7b52687d101e367728d752d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_prop_feature_lists_feature_type_enum" AS ENUM('BEDS_COUNT', 'BATHS_COUNT', 'PARKING_LOTS_COUNT', 'FLOORS_COUNT', 'BEDROOMS_FEATURES', 'BATHROOMS_FEATURES', 'PARKING_FEATURES', 'HEATING', 'COOLING', 'APPLIANCES', 'PROPERTY_FEATURES', 'LOT_FEATURES', 'FARM_FEATURES', 'CONSTRUCTION_TYPE_STYLE', 'CONSTRUCTION_MATERIALS', 'CONSTRUCTION_CONDITION', 'UTILITIES_FEATURES', 'GREEN_ENERGY_FEATURES', 'FINANCIAL_LISTING_DETAILS', 'AMENITY_FEATURES', 'OTHER_FEATURES')`);
        await queryRunner.query(`CREATE TABLE "ag_prop_feature_lists" ("id" bigint NOT NULL, "property_id" bigint NOT NULL, "feature_type" "public"."ag_prop_feature_lists_feature_type_enum" NOT NULL DEFAULT 'OTHER_FEATURES', "name" text, "description" text, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bb0004e060e6c10076e82301ed0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_prop_medias_media_type_enum" AS ENUM('photo', 'floor_plan', 'virtual_tour_360', 'video')`);
        await queryRunner.query(`CREATE TABLE "ag_prop_medias" ("id" BIGSERIAL NOT NULL, "media_collection_id" bigint NOT NULL, "media_collection_slug" text NOT NULL, "sort" integer NOT NULL, "property_id" bigint NOT NULL, "url" text NOT NULL, "name" text NOT NULL, "description" text, "alt_text" text, "media_type" "public"."ag_prop_medias_media_type_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f702f0129fa962fc1412aabf5a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_accounts" ("id" text NOT NULL, "user_id" text NOT NULL, "account_id" text NOT NULL, "provider_id" text NOT NULL, "access_token" text, "refresh_token" text, "access_token_expires_at" TIMESTAMP WITH TIME ZONE, "refresh_token_expires_at" TIMESTAMP WITH TIME ZONE, "scope" text, "id_token" text, "password" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_34034a4dd684f3cda8d11b4c21f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_verifications" ("id" text NOT NULL, "identifier" character varying NOT NULL, "value" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a0910e1b7a7738b2c5d16dac51b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" BIGSERIAL NOT NULL, "conversation_id" text NOT NULL, "message_id" bigint, "sender_id" text NOT NULL, "receiver_id" text NOT NULL, "content" text NOT NULL, "sent_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "read_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inquiries" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_ceacaa439988b25eb9459e694d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_saved_searches" ("id" BIGSERIAL NOT NULL, "user_id" text, "name" text, "fingerprint" text NOT NULL, "ip_address" text NOT NULL, "user_agent" text NOT NULL, "search" text NOT NULL, "is_explicit" boolean NOT NULL, "is_auto" boolean NOT NULL, "is_anonymous" boolean NOT NULL, "filters" jsonb NOT NULL, "last_notified_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f3a60d7efcae88153a51c298e63" UNIQUE ("fingerprint"), CONSTRAINT "PK_5b5ae4a21218e7bc1211e67db78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_members_role_enum" AS ENUM('USER', 'ADMIN', 'AGENT', 'MANAGER')`);
        await queryRunner.query(`CREATE TABLE "ag_members" ("id" BIGSERIAL NOT NULL, "organization_id" text NOT NULL, "agency_id" bigint NOT NULL, "user_id" text NOT NULL, "full_name" text NOT NULL, "license_id" text NOT NULL, "role" "public"."ag_members_role_enum" NOT NULL, CONSTRAINT "PK_fe7b7c25716b2371ff63bf5232a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payment_subscriptions_status_enum" AS ENUM('TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCEL', 'EXPIRE')`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payment_subscriptions_billing_cycle_enum" AS ENUM('MONTHLY', 'ANNUAL')`);
        await queryRunner.query(`CREATE TABLE "biz_payment_subscriptions" ("id" BIGSERIAL NOT NULL, "agency_id" bigint NOT NULL, "plan_id" bigint NOT NULL, "status" "public"."biz_payment_subscriptions_status_enum" NOT NULL, "billing_cycle" "public"."biz_payment_subscriptions_billing_cycle_enum" NOT NULL, "current_period_starts_at" TIMESTAMP WITH TIME ZONE, "current_period_ends_at" TIMESTAMP WITH TIME ZONE, "cancelled_at" TIMESTAMP WITH TIME ZONE, "trial_ends_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "subscription_history" json, CONSTRAINT "PK_33ee4cfe67c7e03110fad5dd452" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_saved_properties" ("id" BIGSERIAL NOT NULL, "property_id" bigint NOT NULL, "user_id" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_728792ea729aefbc314df715a65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."iam_users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "iam_users" ("id" text NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, "image" text, "role" "public"."iam_users_role_enum" NOT NULL DEFAULT 'user', "banned" boolean NOT NULL DEFAULT false, "ban_reason" text, "ban_expires" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_0692f810e8926469bec26da0d99" UNIQUE ("email"), CONSTRAINT "PK_02086c69f80fed8ae319ec498ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payment_plans_class_enum" AS ENUM('FREE', 'BASIC', 'AGENT', 'PRO')`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payment_plans_type_enum" AS ENUM('LISTING_BOOST', 'BANNER', 'FEATURED_AGENCY', 'PROMOTION', 'SUBSCRIPTION')`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payment_plans_billing_cycle_enum" AS ENUM('LUMP', 'MONTHLY', 'ANNUAL')`);
        await queryRunner.query(`CREATE TABLE "biz_payment_plans" ("id" BIGSERIAL NOT NULL, "sort" integer NOT NULL, "key" text NOT NULL, "name" text NOT NULL, "description" text, "class" "public"."biz_payment_plans_class_enum" NOT NULL, "type" "public"."biz_payment_plans_type_enum" NOT NULL, "price" numeric(14,2) NOT NULL, "currency" text NOT NULL, "duration_days" integer NOT NULL, "lead_quota" integer, "listing_quota" integer, "collection_quota" integer, "media_quota" integer, "member_quota" integer, "billing_cycle" "public"."biz_payment_plans_billing_cycle_enum" NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "UQ_b4a427c7a5c8b47522ad43c1a95" UNIQUE ("key"), CONSTRAINT "PK_ff05f8ce27c7eb407f26115ad61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ag_property_prices_pricing_type_enum" AS ENUM('TOTAL', 'PER_SQM', 'RENT')`);
        await queryRunner.query(`CREATE TABLE "ag_property_prices" ("id" bigint NOT NULL, "agency_id" bigint NOT NULL, "posted_by_id" text NOT NULL, "property_id" bigint NOT NULL, "prev_price_id" bigint NOT NULL, "currency" text NOT NULL DEFAULT 'USD', "is_negotiable" boolean NOT NULL DEFAULT false, "total_amount" numeric(14,2) NOT NULL, "pricing_type" "public"."ag_property_prices_pricing_type_enum" NOT NULL DEFAULT 'TOTAL', "price_per_sqm" numeric(14,2), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9eea2b92cda70b507e00e29dff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."agencies_verification_enum" AS ENUM('UNVERIFY', 'PARTIAL', 'FULL_VERIFY')`);
        await queryRunner.query(`CREATE TABLE "agencies" ("id" BIGSERIAL NOT NULL, "slug" text NOT NULL, "owner_id" text NOT NULL, "plan_id" bigint NOT NULL, "organization_id" text NOT NULL, "name" text NOT NULL, "profile_url" text, "cover_url" text, "verification" "public"."agencies_verification_enum" NOT NULL DEFAULT 'UNVERIFY', "is_developer" boolean NOT NULL DEFAULT false, "bio" text, "website_url" text NOT NULL, "social_links" jsonb, "views_count" integer NOT NULL DEFAULT '0', "active_listing_count" integer NOT NULL DEFAULT '0', "total_closed_transaction_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_77c10291e442a33f0060b9cad0d" UNIQUE ("slug"), CONSTRAINT "PK_8ab1f1f53f56c8255b0d7e68b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payments_purpose_enum" AS ENUM('CHARGE', 'PURCHASE', 'REFUND')`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payments_status_enum" AS ENUM('PENDING', 'SUCCEED', 'FAIL', 'REFUND', 'CANCEL')`);
        await queryRunner.query(`CREATE TYPE "public"."biz_payments_provider_enum" AS ENUM('PAYPAL', 'STRIPE', 'PAYMONGO', 'GCASH', 'MANUAL', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "biz_payments" ("id" bigint NOT NULL, "agency_id" bigint NOT NULL, "subscription_id" bigint, "promotion_id" bigint, "currency" text NOT NULL, "amount" numeric(14,2) NOT NULL, "purpose" "public"."biz_payments_purpose_enum" NOT NULL, "status" "public"."biz_payments_status_enum" NOT NULL, "provider" "public"."biz_payments_provider_enum" NOT NULL, "provider_ref" text, "payment_method" text, "failure_reason" text, "paid_at" TIMESTAMP WITH TIME ZONE, "refunded_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a9846aebcd4a74a082b98ae665" UNIQUE ("provider_ref"), CONSTRAINT "PK_aa15cc98605ae8f08964a37da6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_sessions" ("id" text NOT NULL, "token" text NOT NULL, "user_id" text NOT NULL, "active_organization_id" text, "active_team_id" text, "impersonated_by" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7b7927928723b844e22dcdbcee9" UNIQUE ("token"), CONSTRAINT "PK_36956c112e7109dc03df5cba147" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorite_properties" ("id" BIGSERIAL NOT NULL, "property_id" bigint NOT NULL, "user_id" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ec7a58b774daa3c27c57978c1a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_favorite_properties"`);
        await queryRunner.query(`DROP TABLE "iam_sessions"`);
        await queryRunner.query(`DROP TABLE "biz_payments"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payments_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payments_purpose_enum"`);
        await queryRunner.query(`DROP TABLE "agencies"`);
        await queryRunner.query(`DROP TYPE "public"."agencies_verification_enum"`);
        await queryRunner.query(`DROP TABLE "ag_property_prices"`);
        await queryRunner.query(`DROP TYPE "public"."ag_property_prices_pricing_type_enum"`);
        await queryRunner.query(`DROP TABLE "biz_payment_plans"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payment_plans_billing_cycle_enum"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payment_plans_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payment_plans_class_enum"`);
        await queryRunner.query(`DROP TABLE "iam_users"`);
        await queryRunner.query(`DROP TYPE "public"."iam_users_role_enum"`);
        await queryRunner.query(`DROP TABLE "user_saved_properties"`);
        await queryRunner.query(`DROP TABLE "biz_payment_subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payment_subscriptions_billing_cycle_enum"`);
        await queryRunner.query(`DROP TYPE "public"."biz_payment_subscriptions_status_enum"`);
        await queryRunner.query(`DROP TABLE "ag_members"`);
        await queryRunner.query(`DROP TYPE "public"."ag_members_role_enum"`);
        await queryRunner.query(`DROP TABLE "user_saved_searches"`);
        await queryRunner.query(`DROP TABLE "inquiries"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "iam_verifications"`);
        await queryRunner.query(`DROP TABLE "iam_accounts"`);
        await queryRunner.query(`DROP TABLE "ag_prop_medias"`);
        await queryRunner.query(`DROP TYPE "public"."ag_prop_medias_media_type_enum"`);
        await queryRunner.query(`DROP TABLE "ag_prop_feature_lists"`);
        await queryRunner.query(`DROP TYPE "public"."ag_prop_feature_lists_feature_type_enum"`);
        await queryRunner.query(`DROP TABLE "iam_org_invitations"`);
        await queryRunner.query(`DROP TYPE "public"."iam_org_invitations_status_enum"`);
        await queryRunner.query(`DROP TABLE "ag_prop_listing_promotions"`);
        await queryRunner.query(`DROP TABLE "iam_org_members"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TYPE "public"."locations_class_enum"`);
        await queryRunner.query(`DROP TABLE "ag_properties"`);
        await queryRunner.query(`DROP TYPE "public"."ag_properties_property_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ag_properties_property_type_enum"`);
        await queryRunner.query(`DROP TABLE "iam_org_roles"`);
        await queryRunner.query(`DROP TABLE "iam_organizations"`);
        await queryRunner.query(`DROP TABLE "ag_reviews"`);
        await queryRunner.query(`DROP TYPE "public"."ag_reviews_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ag_reviews_class_enum"`);
        await queryRunner.query(`DROP TABLE "ag_service_areas"`);
        await queryRunner.query(`DROP TABLE "ag_prop_collections"`);
    }

}
