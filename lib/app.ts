import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

import * as mongoClient from "mongodb";

class App {

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
      
      var url = "mongodb://localhost:27017/contactlist";
      mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("contactlist");
            var query = {};
            dbo.collection("contactlist").find(query).toArray(function(err, result) {
                if (err) throw err;
                //res.json(result);
                res.status(200).send({
        			message: result
      			})
            });
    	});

    });

    router.post('/', (req: Request, res: Response) => {
      const data = req.body;
      // query a database and save data
      res.status(200).send(data);
    });

    this.app.use('/', router)

  }

}

export default new App().app;