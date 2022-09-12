"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_routes_1 = require("./routes/video-routes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const bloggers = [
    {
        "id": 0,
        "name": "string",
        "youtubeUrl": "string"
    },
    {
        "id": 0,
        "name": "string",
        "youtubeUrl": "string"
    }
];
app.use((0, body_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use('/videos', video_routes_1.videoRoutes);
// app.get('/videos', (req: Request, res: Response) => {
//     if (req.query.title) {
//         res.send(videos.filter(product => product.title.indexOf(req.query.title.toString()) > -1))
//     } else {
//         res.send(videos)
//     }
// })
// app.post('/videos', (req: Request, res: Response) => {
//     const newVideo = {id: +new Date(), title: req.body.title}
//     videos.push(newVideo);
//     res.send(videos.filter(product => product.title.indexOf(req.query.title.toString()) > -1))
// })
// app.get('/videos/:id', (req: Request, res: Response) => {
//     const product = videos.find(product => product.title === req.params.id);
//     if (product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })
// app.delete('/videos/:id', (req: Request, res: Response) => {
//     for (let i = 0; i < videos.length; i++) {
//         if (videos[i].id === +req.params.id) {
//             videos.splice(i, 1)
//             res.send(204)
//             return
//         }
//     }
//     res.send(404)
// })
app.get('/bloggers', (req, res) => {
    res.send(bloggers);
});
app.get('/bloggers/:id', (req, res) => {
    const address = bloggers.find(address => address.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
