import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";

@Entity({
	name: "messages",
})
// Conversation view: all messages in a thread, oldest to newest.
@Index(["conversationId", "sentAt"])
// Inbox unread-count queries filter by receiver + readAt IS NULL.
@Index(["receiverId", "readAt"])
export class Message {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text" })
	conversationId: string;
	// Reply-to / thread-parent reference within the same conversation.
	@Column({ type: "bigint", nullable: true })
	messageId: number | null;
	@ManyToOne(() => Message, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "messageId" })
	parentMessage: Relation<Message> | null;
	// iam_users — indexed columns, no relation (see agencies.ts note).
	@Column({ type: "text" })
	@Index()
	senderId: string;
	@Column({ type: "text" })
	receiverId: string;
	@Column({ type: "text" })
	content: string;
	@CreateDateColumn({ type: "timestamptz" })
	sentAt: Date;
	@Column({ type: "timestamptz", nullable: true })
	readAt: Date | null;
}
