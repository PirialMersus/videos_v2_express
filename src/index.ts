import express, {Request, Response} from 'express'
import {videoRoutes, videos} from "./routes/video-routes";
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000


const bloggers = [
    {
        "id": 0,
        "name": "string",
        "youtubeUrl": "string"
    }
    , {
        "id": 0,
        "name": "string",
        "youtubeUrl": "string"
    }
]
app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.use('/videos', videoRoutes)

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
app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.length = 0
    res.send(204)
})
// app.get('/bloggers/:id', (req: Request, res: Response) => {
//     const address = bloggers.find(address => address.id === +req.params.id);
//     if (address) {
//         res.send(address)
//     } else {
//         res.send(404)
//     }
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})