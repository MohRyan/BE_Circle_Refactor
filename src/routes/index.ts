import express from "express";
import Authentication from "../middleware/AuthMidleware";
import uploadsMidleware from "../middleware/UploadsMidleware";
// import { AuthControllers, FollowControllers, LikesControllers, RepliesControllers, ThreadsControllers, UserControllers } from "../controllers";
import * as AuthControllers from "../controllers/AuthControllers";
import * as UserControllers from "../controllers/UserControllers";
import * as ProfileControllers from "../controllers/ProfileControllers";
import * as ThreadsControllers from "../controllers/ThreadsControllers";
import * as LikesControllers from "../controllers/LikesControllers";
import * as FollowControllers from "../controllers/FollowControllers";
// import { uploadProfilePicture, uploadThreads } from "../middleware/UploadsMidleware";

const Route = express.Router();

Route.use("/uploads", express.static("uploads"));
// // Route.use("/uploads/threads", express.static("uploads"))

// // === Auth Route
Route.post("/register", AuthControllers.register);
Route.post("/login", AuthControllers.login);
Route.get("/check", Authentication, AuthControllers.checkWhoLogin);

// // === Users Route
Route.get("/users", UserControllers.getAllUser);
// Route.get("/users/:id", UserControllers.findWithLimit)
// Route.get("/user/:id", UserControllers.findUsersWithId)
// Route.get("/users/user", UserControllers.findUser)
// Route.get("/users/admin", UserControllers.findAdmin)
// // Route.get("/users/admin/:id", UserControllers.findAdminWithId)
// Route.delete("/users/:id", UserControllers.delete)
Route.get("/user/:id", UserControllers.getUser);
// === Profile Route
Route.patch(
  "/userprofile",
  Authentication,
  uploadsMidleware("cover"),
  ProfileControllers.updateProfile
);
Route.get("/profile", Authentication, ProfileControllers.getProfile);
Route.get("/profile/:id", Authentication, ProfileControllers.getProfileById);

// // === users Password
// Route.get("/userspass", UserControllers.findShowPassUser)

// // // === Threads Route
Route.get("/threads", ThreadsControllers.getThreads);
Route.get("/postat", ThreadsControllers.getPostAt);
Route.get("/thread/:id", ThreadsControllers.getThread);
Route.get("/threads/:id", ThreadsControllers.getThreadById);
Route.get("/thread", Authentication, ThreadsControllers.getThreadByUserId);
Route.post(
  "/thread",
  Authentication,
  uploadsMidleware("image"),
  ThreadsControllers.createThread
);
// Route.get("/threads/:id", ThreadsControllers.findThreadsWithId)
// Route.get("/threads/detail/:id", ThreadsControllers.detailThreads)
// Route.post("/threads/:id", uploadThreads("image"), ThreadsControllers.create)
// // // === Replies Route
Route.get("/replies/:id", ThreadsControllers.getReplies);
Route.post(
  "/replie",
  Authentication,
  uploadsMidleware("image"),
  ThreadsControllers.createThread
);

// // // === Likes Route
Route.get("/likes", LikesControllers.getLikes);
Route.get("/like/:threadId", Authentication, LikesControllers.getCurrentLike);
Route.post("/like", Authentication, LikesControllers.creatLike);

// // // === Follows Route
Route.post("/follow", Authentication, FollowControllers.follow);
Route.get(
  "/checkfollow/:userId",
  Authentication,
  FollowControllers.checkFollowStatus
);
Route.get("/followers", Authentication, FollowControllers.getFollowers);
Route.get("/following", Authentication, FollowControllers.getFollowing);
Route.get("/suggest", Authentication, FollowControllers.getSuggest);
// Route.get("/follower/:id", FollowControllers.findFollower)
// Route.post("/follow", FollowControllers.create)

// // Route.get("/article/users/:userId", ArticleControllers.findGetUser)

// // // === Partai Route
// // Route.post("/partai", PartaiControllers.create)
// // Route.get("/partai", PartaiControllers.find)
// // Route.delete("/partai/:id", PartaiControllers.delete)
// // Route.patch("/partai/:id", PartaiControllers.update)

// // // === Paslon Route
// // Route.post("/paslon", PaslonControllers.create)
// // Route.get("/paslon", PaslonControllers.find)
// // Route.delete("/paslon/:id", PaslonControllers.delete)
// // Route.patch("/paslon/:id", PaslonControllers.update)

// // // === Paslon Route
// // Route.post("/vote", VoteControllers.create)
// // Route.get("/vote", VoteControllers.find)

export default Route;
