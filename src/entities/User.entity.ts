import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import Threads from "./Threads.entity";
import Likes from "./Likes.entity";
import Replies from "./Replies.entity";
import Follows from "./Follows.entity";


@Entity({ name: "users" })
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "full_name" })
  full_name: string;

  @Column()
  email: string

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  // ======= users ke threads
  @OneToMany(() => Threads, (threads) => threads.users)
  threads: Threads[];

  // ======= users ke likes
  @OneToMany(() => Likes, (likes) => likes.users)
  likes: Likes[];

  // ======= users ke replies
  @OneToMany(() => Replies, (replies) => replies.users)
  replies: Replies[];

  // ======= users ke follows
  @OneToMany(() => Follows, (followerId) => followerId.follower)
  followerId: Follows[]

  @OneToMany(() => Follows, (followedId) => followedId.followed)
  followedId: Follows[]


}
