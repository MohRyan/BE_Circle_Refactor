import { NextFunction, Request, Response } from "express";
import { any, string } from "joi";
import multer = require("multer");
import * as path from "path";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/threads");
    }
    if (file.fieldname === "cover") {
      cb(null, "uploads/profile");
    }

    if (file.fieldname === "avatar") {
      cb(null, "uploads/profile");
    }
  },
  filename: (_req, file, cb) => {
    const uniqName = Date.now();
    cb(null, file.fieldname + "-" + uniqName + path.extname(file.originalname));
    // console.log("🚀 ~ uploadThreads ~ file:", file)
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  {
    name: "image",
    maxCount: 4,
  },
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "cover",
    maxCount: 1,
  },
]);

const uploadsMidleware = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({
            status: false,
            message: "File too Large",
          });
        }
        return res.status(500).json({
          status: false,
          message: (err as unknown as Error).message,
        });
      }
      // res.locals.filename = req.file?.filename
      next();
    });
  };
};
export default uploadsMidleware;
