/**
 * Created by kevin gosse on 05/02/2016.
 */

import express from 'express';

let app = express();

app.get('/', (req, res) => res.send('hello express!'));

app.listen(3000);
