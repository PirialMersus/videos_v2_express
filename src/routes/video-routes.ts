import {Request, Response, Router} from "express";

type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null | number
    createdAt: string
    publicationDate: string
    availableResolutions: string[] | string
}
type availableResolutions = ['P144' | 'P240' | 'P360' | 'P480' | 'P720' | 'P1080' | 'P1440' | 'P2160']
type ErrorMessageObjType = {
    message: string
    field: string
}
const neededVideoResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
const errorMessageObj: ErrorMessageObjType[] = [] as ErrorMessageObjType[]


const videos: VideoType[] = [{
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
}]

export const videoRoutes = Router()

videoRoutes.get('/', (req: Request, res: Response) => {
    // if (req.query.title) {
    //     const searchString = req.query.title.toString();
    //     res.send(videos.filter(video => video.title.indexOf(searchString) > -1))
    // } else {
    res.send(videos)
    // }
})
    .get('/:id?', (req: Request, res: Response) => {
        const id = +req.params.id

        if (id || id === 0) {
            const neededVideo = videos.find(video => video.id === id)
            if (neededVideo) {
                console.log('neededVideo', neededVideo)
                res.send(neededVideo)
            } else {
                res.send(404)
            }
        } else {
            res.send(videos)
        }
    })
    // {
    //     "title": "string",
    //     "author": "string",
    //     "availableResolutions": [
    //     "P144"
    // ]
    // }

    .post('/', (req: Request, res: Response) => {

        const neededResolutionsArray = []
        const title: string = req.body.title
        const author: string = req.body.author
        const availableResolutions: string | string[] = req.body.availableResolutions
        if (title.length > 40) errorMessageObj.push({field: 'title', message: 'Max length 40'})
        if (!title) errorMessageObj.push({field: 'title', message: 'Title is not present'})
        if (author.length > 20) errorMessageObj.push({field: 'author', message: 'Max length 20'})
        if (!author) errorMessageObj.push({field: 'Author', message: 'Author is not present'})
        if (!availableResolutions) errorMessageObj.push({
            field: 'availableResolutions',
            message: 'At least one resolution should be added'
        })
        if (typeof availableResolutions === "object") {
            availableResolutions.forEach(resolution => {
                if (!neededVideoResolutions.includes(resolution)) neededResolutionsArray.push(resolution)
                errorMessageObj.push({field: 'availableResolutions', message: 'Wrong resolutions'})
            })
        }
        if (typeof availableResolutions === "string") {
            if (!neededVideoResolutions.includes(availableResolutions)) neededResolutionsArray.push(availableResolutions)
            errorMessageObj.push({field: 'availableResolutions', message: 'Wrong resolution'})
        }
        if (errorMessageObj.length) res.status(400).send(errorMessageObj)

        const timeElapsed = Date.now();
        const currentTime = new Date(timeElapsed);
        const newVideo = {
            id: new Date(),
            title,
            author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: currentTime.toISOString(),
            publicationDate: currentTime.toISOString(),
            availableResolutions
        }
        videos.push(newVideo);
        res.status(201).send(newVideo)
    })
    .put('/:id?', (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!id) errorMessageObj.push({field: 'id', message: 'Id is not present'})
        if (req.query.title) {
            const searchString = req.query.title.toString();
            res.send(videos.filter(video => video.title.indexOf(searchString) > -1))
        } else {
            res.send(videos)
        }
    })
videoRoutes.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})