"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoutes = void 0;
const express_1 = require("express");
const videos = [{
        "id": 0,
        "title": "zeroVideo",
        "author": "Gena",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-09-10T12:32:51.477Z",
        "publicationDate": "2022-09-10T12:32:51.477Z",
        "availableResolutions": [
            "P144"
        ]
    }, {
        "id": 1,
        "title": "firstVideo",
        "author": "Alena",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-09-10T12:32:51.477Z",
        "publicationDate": "2022-09-10T12:32:51.477Z",
        "availableResolutions": [
            "P360"
        ]
    }];
exports.videoRoutes = (0, express_1.Router)();
exports.videoRoutes.get('/', (req, res) => {
    // if (req.query.title) {
    //     const searchString = req.query.title.toString();
    //     res.send(videos.filter(video => video.title.indexOf(searchString) > -1))
    // } else {
    res.send(videos);
    // }
})
    .get('/:id?', (req, res) => {
    const id = +req.params.id;
    if (id || id === 0) {
        const neededVideo = videos.find(video => video.id === id);
        if (neededVideo) {
            console.log('neededVideo', neededVideo);
            res.send(neededVideo);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(videos);
    }
});
// videoRoutes.post('/', (req: Request, res: Response) => {
//     const newVideo = {id: +new Date(), title: req.body.title}
//     videos.push(newVideo);
//     res.send(videos.filter(product => product.title.indexOf(req.query.title.toString()) > -1))
// })
exports.videoRoutes.delete('/:id', (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
