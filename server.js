/**
 * Created by kevin gosse on 05/02/2016.
 */

import express from 'express';

let app = express();

app.use(express.static('public'));

app.listen(3000);
