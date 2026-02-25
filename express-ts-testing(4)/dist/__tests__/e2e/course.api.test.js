import request from 'supertest';
import { app } from '../../src/';
describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/');
    });
    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses?title=front')
            .expect(200, [{ id: 1, title: 'front-end' }]);
    });
    it('should return 404 for non-existent course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(404);
    });
});
//# sourceMappingURL=course.api.test.js.map