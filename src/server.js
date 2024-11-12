import {express, port} from "./config/config.js"


express.listen(port, async() => {
    console.log(`Example app listening on port ${port}`);
});