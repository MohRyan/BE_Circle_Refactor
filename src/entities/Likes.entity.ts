import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import Users from "./User.entity";
import Threads from "./Threads.entity";


@Entity({ name: "likes" })
export default class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userLikeId: number

  @Column({ name: 'threadsId' })
  threadsLikeId: number

  @ManyToOne(() => Users, (users) => users.likes)
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne(() => Threads, (threads) => threads.likes)
  @JoinColumn({ name: 'threadsId' })
  threads: Users;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

}
