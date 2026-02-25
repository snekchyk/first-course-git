import express from "express"; // Add Express here
export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
export const getCoursesRouter = (db) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        let foundCourses = db.courses;
        console.log(req.query.title);
        if (req.query.title) {
            foundCourses = foundCourses
                .filter(c => c.title.indexOf(req.query.title) > -1);
        }
        res.json(foundCourses.map(dbCourse => {
            return {
                id: dbCourse.id,
                title: dbCourse.title,
                passcode: dbCourse.passcode
            };
        }));
    });
    router.get('/:id', (req, res) => {
        const foundCourses = db.courses.find(c => c.id === +req.params.id);
        if (!foundCourses) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json(foundCourses);
    });
    router.post('/', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const createCourse = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0,
            passcode: +(new Date())
        };
        db.courses.push(createCourse);
        console.log(db.courses);
        res.status(HTTP_STATUSES.CREATED_201).json(createCourse);
    });
    router.delete('/:id', (req, res) => {
        const a = db.courses.length;
        db.courses = db.courses.filter(c => c.id !== +req.params.id);
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
    router.put('/:id', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const foundCourse = db.courses.find(c => c.id === +req.params.id);
        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        foundCourse.title = req.body.title;
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    return router;
};
//# sourceMappingURL=courses.js.map