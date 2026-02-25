import express from 'express';
import { getCoursesRouter } from './routes/courses.js'; // Импортируем функцию
import { db } from './db/db.js';
import { getTestsRouter } from "./routes/tests.js";
export const app = express();
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
const coursesRoutes = getCoursesRouter(db);
const testsRoutes = getTestsRouter(db);
app.use('/courses', coursesRoutes);
app.use('/__tests__', testsRoutes);
//# sourceMappingURL=app.js.map