import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

import routes from './routes/index'
import { db } from './config/db';
import e from "express";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
//RECIBIR BODY
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req: Request ,res : Response)=>{
    res.send('Hello World');
});

app.get('/about', (req: Request ,res : Response)=>{
    res.send('About us');
});

app.post('/about', (req: Request ,res : Response)=>{
    res.send("name: "+req.body.name);
});
routes(app);

db.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on port: ${port}`)
    })
}).catch((err)=> console.error(err));


export default app;