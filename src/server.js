import {express, port} from "./config/config.js"
import db from "./database/db.js"

express.listen(port, async() => {
    console.log(`Example app listening on port ${port}`);
    await db.sync({ force: false });
    console.log('All models were synchronized successfully.');
});