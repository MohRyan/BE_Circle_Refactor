import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import Users from "./User.entity";

@Entity({ name: "follows" })
export default class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'follower_id', })
  userFollower_Id: number

  @Column({ name: 'followed_id', })
  userFollowed_Id: number

  @Column()
  user_follow: boolean

  // ======= follows ke users
  @ManyToOne(() => Users, (users) => users.followerId)
  @JoinColumn({ name: 'follower_id' })
  follower: Users;

  @ManyToOne(() => Users, (users) => users.followedId)
  @JoinColumn(
    { name: 'followed_id' }
  )
  followed: Users;


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

}
