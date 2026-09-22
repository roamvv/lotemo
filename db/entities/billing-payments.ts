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

import { PaymentSubscription } from "./billing-payment-subs";

export const paymentStatuses = [
	"PENDING",
	"SUCCEED",
	"FAIL",
	"REFUND",
	"CANCEL",
] as const;

export const paymentProviders = [
	"PAYPAL",
	"STRIPE",
	"PAYMONGO",
	"GCASH",
	"MANUAL",
	"OTHER",
] as const;

export const paymentPurposes = ["CHARGE", "PURCHASE", "REFUND"] as const;

@Entity({
	name: "biz_payments",
})
// Agency billing history / statements, newest first.
@Index(["agencyId", "createdAt"])
export class Payment {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	// ag_agencies — indexed FK column, no relation (see subscriptions note).
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	subscriptionId: number;
	@ManyToOne(() => PaymentSubscription, {
		nullable: true,
		onDelete: "SET NULL",
	})
	@JoinColumn({ name: "subscriptionId" })
	subscription: Relation<PaymentSubscription> | null;
	// FLAGGED FOR REVIEW: unclear whether this points at
	// ag_prop_listing_promotions or something in this module — no promotion
	// entity exists here yet. Left as an indexed column pending that answer.
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	promotionId: number;
	@Column({ type: "text" })
	currency: string;
	@Column({ type: "decimal", precision: 14, scale: 2 })
	amount: number;
	@Column({ type: "enum", enum: paymentPurposes })
	purpose: (typeof paymentPurposes)[number];
	@Column({ type: "enum", enum: paymentStatuses })
	@Index()
	status: (typeof paymentStatuses)[number];
	@Column({ type: "enum", enum: paymentProviders })
	provider: (typeof paymentProviders)[number];
	@Column({ type: "text", unique: true, nullable: true })
	providerRef: string | null;
	@Column({ type: "text", nullable: true })
	paymentMethod: string | null;
	@Column({ type: "text", nullable: true })
	failureReason: string | null;
	@Column({ type: "timestamptz", nullable: true })
	paidAt: Date | null;
	@Column({ type: "timestamptz", nullable: true })
	refundedAt: Date | null;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
