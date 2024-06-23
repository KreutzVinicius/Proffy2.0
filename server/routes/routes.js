import { Router } from "express";
import bodyParser from "body-parser";
import * as mongo from "../services/mongo.js";
import { GridFSBucket, MongoError, MongoRuntimeError, ObjectId } from 'mongodb'

const dbName = "proffy";

const router = Router();
router.use(bodyParser.json());

router.use(async function (req, res, next) {
  req.db = (await mongo.connect()).db(dbName);
  next();
});

const keys = ['user', 'class']

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const collection = req.db.collection(`users`);
  const users = await collection.find({}).toArray();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
      const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
      res.cookie('auth_token', token, { httpOnly: false, sameSite: 'strict' });
      res.json({ ...user, password: undefined });
  } else {
      res.sendStatus(401);
  }
});

// FS endpoint
router.get(`/fs/:id`, async (req, res, next) => {
  try {
    const gfsBucket = new GridFSBucket(req.db);
    const file = await gfsBucket
      .find({ _id: new ObjectId(req.params.id) })
      .next();
    if (file == null) {
      return res.sendStatus(404);
    }
    if (
      req.headers["if-modified-since"] &&
      Math.floor(new Date(req.headers["if-modified-since"]).getTime() / 1000) ==
        Math.floor(file.uploadDate.getTime() / 1000)
    ) {
      return res.sendStatus(304);
    }
    res.setHeader("Last-Modified", file.uploadDate.toUTCString());
    res.setHeader("Content-Length", file.length);
    if (file.contentType) res.setHeader("Content-Type", file.contentType);
    const fileDownload = gfsBucket.openDownloadStream(
      new ObjectId(req.params.id)
    );
    fileDownload.on("error", (e) => {
      next(e);
    });
    fileDownload.pipe(res);
  } catch (error) {
    res.status(500).send(stringifyError(error));
  }
});

router.post(`/fs/:id`, (req, res) => {
  try {
    const gfsBucket = new GridFSBucket(req.db);
    const fileUpload = gfsBucket.openUploadStream(req.params.id, {
      id: new ObjectId(req.params.id),
      contentType: req.headers["content-type"],
    });
    req
      .pipe(fileUpload)
      .once("error", (error) =>
        res
          .status(
            error instanceof MongoError && error.code == 11000 ? 409 : 500
          )
          .send(stringifyError(error))
      )
      .once("finish", () => res.status(201).json({ id: fileUpload.id }));
  } catch (error) {
    res.status(500).send(stringifyError(error));
  }
});

router.delete(`/fs/:id`, async (req, res) => {
  try {
    const gfsBucket = new GridFSBucket(req.db);
    await gfsBucket.delete(new ObjectId(req.params.id));
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res
      .status(
        error instanceof MongoRuntimeError &&
          error.message.startsWith("File not found for id ")
          ? 404
          : 500
      )
      .send(stringifyError(error));
  }
});

for (const key of keys) {
  // Create
  router.post(`/${key}`, async (req, res) => {
    try {
      const collection = req.db.collection(`${key}`);
      const result = await collection.insertOne(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  // Read
  router.get(`/${key}`, async (req, res) => {
    try {
      const collection = req.db.collection(`${key}`);
      const result = await collection.find(req.query).toArray();
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  // Update
  router.put(`/${key}/:id`, async (req, res) => {
    try {
      const collection = req.db.collection(`${key}`);
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  // Delete
  router.delete(`/${key}/:id`, async (req, res) => {
    try {
      const collection = req.db.collection(`${key}`);
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  //Patch
  router.patch(`/${key}/:id`, async (req, res) => {
    try {
      const collection = req.db.collection(`${key}`);
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
}
export default router;
