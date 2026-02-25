import express from 'express';
const app = express();
export { app };
const port = 3002;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.set('strict routing', false);
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const db = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'devops', studentsCount: 10 },
        { id: 4, title: 'automation qa', studentsCount: 10 }
    ]
};
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    console.log(req.query.title);
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses.map(dbCourse => {
        return {
            id: dbCourse.id,
            title: dbCourse.title
        };
    }));
});
app.get('/courses/:id', (req, res) => {
    const foundCourses = db.courses.find(c => c.id === req.params.id);
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundCourses);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createCourse = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 0
    };
    db.courses.push(createCourse);
    console.log(db.courses);
    res.status(HTTP_STATUSES.CREATED_201).json(createCourse);
});
app.delete('/courses/:id', (req, res) => {
    const a = db.courses.length;
    db.courses = db.courses.filter(c => c.id !== req.params.id);
    const b = db.courses.length;
    if (a === b) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        return;
    }
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const foundCourse = db.courses.find(c => c.id === req.params.id);
    console.log(foundCourse);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundCourse.title = req.body.title;
    res.status(HTTP_STATUSES.NO_CONTENT_204);
});
app.delete('/clear', (req, res) => {
    console.log('start delete data...');
    console.log(db.courses);
    db.courses = [];
    if (db.courses.length > 0) {
        console.log('data not deleted, some error');
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.listen(port, () => {
    console.log('Server has started on port ' + port);
});
//# sourceMappingURL=index.js.map