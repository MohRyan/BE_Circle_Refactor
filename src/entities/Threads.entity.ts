import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import Users from "./User.entity";
import Likes from "./Likes.entity";
import Replies from "./Replies.entity";



@Entity({ name: "threads" })
export default class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, name: 'id_users' })
  idUsers: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public posted_at: Date;

  // ======= threads ke users
  @ManyToOne(() => Users, (user) => user.threads, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: 'id_users' })
  users: Users;

  // ======= threads ke likes
  @OneToMany(() => Likes, (likes) => likes.threads)
  // @JoinColumn({ name: 'id_users' })
  likes: Likes[];

  // ======= threads ke likes
  @OneToMany(() => Replies, (replies) => replies.threads)
  replies: Replies[];


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

}
