"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoutes = exports.videos = void 0;
const express_1 = require("express");
const neededVideosResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
let errorMessageObj = [];
exports.videos = [{
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
    res.send(exports.videos);
    // }
})
    .get('/:id?', (req, res) => {
    errorMessageObj = [];
    const id = +req.params.id;
    if (id || id === 0) {
        const neededVideo = exports.videos.find(video => video.id === id);
        if (neededVideo) {
            console.log('neededVideo', neededVideo);
            res.send(neededVideo);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(exports.videos);
    }
})
    // {
    //     "title": "string",
    //     "author": "string",
    //     "availableResolutions": [
    //     "P144"
    // ]
    // }
    .post('/', (req, res) => {
    errorMessageObj = [];
    const neededResolutionsArray = [];
    const title = req.body.title;
    const author = req.body.author;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolutions = req.body.availableResolutions;
    // console.log('availableResolutions', availableResolutions)
    if (title.length > 40)
        errorMessageObj.push({ field: 'title', message: 'Max length 40' });
    if (!title || typeof title !== 'string')
        errorMessageObj.push({ field: 'title', message: 'Title is not present' });
    if (author.length > 20)
        errorMessageObj.push({ field: 'author', message: 'Max length 20' });
    if (!author || author === 'null')
        errorMessageObj.push({ field: 'Author', message: 'Author is not present' });
    if (availableResolutions.length < 1 || typeof availableResolutions !== "object")
        errorMessageObj.push({
            field: 'availableResolutions',
            message: 'Send a resolutions array, please'
        });
    if (Array.isArray(availableResolutions)) {
        availableResolutions.forEach(resolution => {
            if (!neededVideosResolutions.includes(resolution)) {
                neededResolutionsArray.push(resolution);
                errorMessageObj.push({
                    field: 'availableResolutions',
                    message: `Wrong resolution: ${resolution}}`
                });
            }
        });
    }
    else {
        errorMessageObj.push({ field: 'availableResolutions', message: 'Wrong resolutions' });
    }
    console.log('typeof canBeDownloaded', typeof canBeDownloaded);
    if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
        errorMessageObj.push({ field: 'canBeDownloaded', message: 'Wrong canBeDownloaded value' });
    }
    if (minAgeRestriction > 18 || minAgeRestriction < 1)
        errorMessageObj.push({
            field: 'minAgeRestriction',
            message: 'Wrong minAgeRestriction value'
        });
    // if (typeof availableResolutions === "string") {
    //     errorMessageObj.push({field: 'availableResolutions', message: 'Wrong resolution'})
    // }
    if (errorMessageObj.length) {
        res.status(400).send(errorMessageObj);
        return;
    }
    // const timeElapsed = Date.now();
    // const currentTime = new Date(timeElapsed);
    // const createdAt = currentTime.toISOString()
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        title,
        author,
        canBeDownloaded: canBeDownloaded ? canBeDownloaded : true,
        minAgeRestriction: minAgeRestriction ? minAgeRestriction : null,
        createdAt: today.toISOString(),
        publicationDate: tomorrow.toISOString(),
        availableResolutions
    };
    exports.videos.push(newVideo);
    res.status(201).send(newVideo);
})
    .put('/:id?', (req, res) => {
    errorMessageObj = [];
    const neededResolutionsArray = [];
    const id = +req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const createdAt = req.body.createdAt;
    const publicationDate = req.body.publicationDate;
    if (!id && id !== 0 || id < 0)
        errorMessageObj.push({
            field: 'id',
            message: 'Id is not present or incorrect value'
        });
    if (title.length > 40)
        errorMessageObj.push({ field: 'title', message: 'Max length 40' });
    if (!title || title === 'null')
        errorMessageObj.push({ field: 'title', message: 'Title is not present' });
    if (author.length > 20)
        errorMessageObj.push({ field: 'author', message: 'Max length 20' });
    if (!author || author === 'null')
        errorMessageObj.push({ field: 'Author', message: 'Author is not present' });
    if (availableResolutions.length < 1 || typeof availableResolutions !== "object")
        errorMessageObj.push({
            field: 'availableResolutions',
            message: 'Send a resolutions array, please'
        });
    if (Array.isArray(availableResolutions)) {
        availableResolutions.forEach(resolution => {
            if (!neededVideosResolutions.includes(resolution)) {
                neededResolutionsArray.push(resolution);
                errorMessageObj.push({
                    field: 'availableResolutions',
                    message: `Wrong resolution: ${resolution}`
                });
            }
        });
    }
    else
        errorMessageObj.push({ field: 'availableResolutions', message: 'Wrong resolution' });
    if (typeof canBeDownloaded !== "boolean" || !canBeDownloaded) {
        errorMessageObj.push({ field: 'canBeDownloaded', message: 'Wrong canBeDownloaded value' });
    }
    if (minAgeRestriction > 18 || minAgeRestriction < 1)
        errorMessageObj.push({
            field: 'minAgeRestriction',
            message: 'Wrong minAgeRestriction value'
        });
    if (!publicationDate || publicationDate === 'null')
        errorMessageObj.push({
            field: 'publicationDate',
            message: 'publicationDate is not present'
        });
    if (errorMessageObj.length) {
        res.status(400).send(errorMessageObj);
        return;
    }
    const updatedVideo = exports.videos.find(video => video.id === id);
    if (!updatedVideo) {
        res.send(404);
    }
    else {
        updatedVideo.author = author;
        updatedVideo.title = title;
        if (availableResolutions)
            updatedVideo.availableResolutions = availableResolutions;
        if (canBeDownloaded) {
            updatedVideo.canBeDownloaded = canBeDownloaded;
        }
        else {
            updatedVideo.canBeDownloaded = false;
        }
        if (minAgeRestriction) {
            updatedVideo.minAgeRestriction = minAgeRestriction;
        }
        else {
            if (!updatedVideo.minAgeRestriction) {
                updatedVideo.minAgeRestriction = null;
            }
        }
        if (createdAt)
            updatedVideo.createdAt = createdAt;
        if (publicationDate) {
            updatedVideo.publicationDate = publicationDate;
        }
        else {
            const date = new Date(createdAt || updatedVideo.createdAt);
            date.setDate(date.getDate() + 1);
            updatedVideo.publicationDate = date.toISOString();
        }
        console.log('updatedVideo', updatedVideo);
        res.send(204);
    }
})
    // .delete('/testing/all-data', (req: Request, res: Response) => {
    //     videos.length = 0
    //     res.send(204)
    // })
    .delete('/:id', (req, res) => {
    errorMessageObj = [];
    const id = +req.params.id;
    if (!id && id !== 0 || id < 0)
        errorMessageObj.push({
            field: 'id',
            message: 'Id is not present or incorrect value'
        });
    if (errorMessageObj.length) {
        res.status(400).send(errorMessageObj);
        return;
    }
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === id) {
            exports.videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
