import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { PaymentPlan } from "./billing-payment-plans";

export const subscritionStatuses = [
	"TRIAL",
	"ACTIVE",
	"PAST_DUE",
	"CANCEL",
	"EXPIRE",
] as const;

export const subscriptionBillingCycles = ["MONTHLY", "ANNUAL"] as const;

@Entity({
	name: "biz_payment_subscriptions",
})
// Billing worker's core query: active/past-due subscriptions whose period
// is ending, per agency.
@Index(["agencyId", "status", "currentPeriodEndsAt"])
export class PaymentSubscription {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	// ag_agencies lives in the agencies module; kept as an indexed FK column
	// rather than a relation to keep the billing module decoupled (it also
	// needs to work from webhook handlers with only the raw id on hand).
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	planId: number;
	@ManyToOne(() => PaymentPlan, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "planId" })
	plan: Relation<PaymentPlan>;
	@Column({ type: "enum", enum: subscritionStatuses })
	status: (typeof subscritionStatuses)[number];
	@Column({ type: "enum", enum: subscriptionBillingCycles })
	billingCycle: (typeof subscriptionBillingCycles)[number];
	@Column({ type: "timestamptz", nullable: true })
	currentPeriodStartsAt: Date;
	@Column({ type: "timestamptz", nullable: true })
	currentPeriodEndsAt: Date;
	@Column({ type: "timestamptz", nullable: true })
	cancelledAt: Date;
	@Column({ type: "timestamptz", nullable: true })
	trialEndsAt: Date;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
	// FLAGGED FOR REVIEW: storing history as a JSON array of the entity's own
	// type is awkward (no relation, easy to grow unbounded, hard to query).
	// A separate `biz_payment_subscription_history` table with a normal
	// @OneToMany would let you index and query past periods properly —
	// worth revisiting when the migrations subtask comes up.
	@Column({ type: "json", nullable: true })
	subscriptionHistory: PaymentSubscription[];
}
