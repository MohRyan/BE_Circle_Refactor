import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import Users from "./User.entity";
import Threads from "./Threads.entity";


@Entity({ name: "replies" })
export default class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: 'userId' })
  userRepliesId: number

  @Column({ name: 'threadsId' })
  threadsRepliesId: number

  // ======= replies ke users
  @ManyToOne(() => Users, (user) => user.replies)
  @JoinColumn({ name: 'userId' })
  users: Users;

  // ======= replies ke threads
  @ManyToOne(() => Threads, (threads) => threads.replies)
  @JoinColumn({ name: 'threadsId' })
  threads: Threads;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

}
