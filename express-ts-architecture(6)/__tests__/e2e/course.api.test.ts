import request from 'supertest'
import {app} from '../../src/app'

describe('Courses API', () => {

    beforeAll(async () => {
        await request(app).delete('/clear')
    })

    // ==============================
    // GET ALL
    // ==============================

    it('GET /courses should return empty array initially', async () => {
        const res = await request(app)
            .get('/courses')
            .expect(200)


        expect(res.body).toEqual([])
    })

    // ==============================
    // CREATE
    // ==============================

    it('POST /courses should not create course with invalid data', async () => {
        await request(app)
            .post('/courses')
            .send({ title: '' })
            .expect(400)

        const res = await request(app).get('/courses')
        expect(res.body.length).toBe(0)
    })

    it('POST /courses should create course with correct data', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({ title: 'nodejs' })
            .expect(201)

        expect(createRes.body).toEqual({
            id: expect.any(Number),
            title: 'nodejs',
            studentsCount: 0
        })

        const getRes = await request(app)
            .get('/courses')
            .expect(200)

        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0]).toEqual({
            id: createRes.body.id,
            title: 'nodejs'
        })
    })

    // ==============================
    // GET BY ID
    // ==============================

    it('GET /courses/:id should return 404 for non-existing id', async () => {
        await request(app)
            .get('/courses/999999')
            .expect(404)
    })

    it('GET /courses/:id should return course by id', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({ title: 'express' })

        const res = await request(app)
            .get(`/courses/${createRes.body.id}`)
            .expect(200)

        expect(res.body).toEqual({
            id: createRes.body.id,
            title: 'express',
            studentsCount: 0
        })
    })

    // ==============================
    // UPDATE
    // ==============================

    it('PUT /courses/:id should return 400 if title invalid', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({ title: 'react' })

        await request(app)
            .put(`/courses/${createRes.body.id}`)
            .send({ title: '' })
            .expect(400)
    })

    it('PUT /courses/:id should return 404 if not found', async () => {
        await request(app)
            .put('/courses/999999')
            .send({ title: 'new-title' })
            .expect(404)
    })

    it('PUT /courses/:id should update course', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({ title: 'angular' })

        await request(app)
            .put(`/courses/${createRes.body.id}`)
            .send({ title: 'angular-pro' })
            .expect(204)

        const res = await request(app)
            .get(`/courses/${createRes.body.id}`)
            .expect(200)

        expect(res.body.title).toBe('angular-pro')
    })

    // ==============================
    // DELETE
    // ==============================

    it('DELETE /courses/:id should return 404 if not found', async () => {
        await request(app)
            .delete('/courses/999999')
            .expect(404)
    })

    it('DELETE /courses/:id should delete course', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({ title: 'nestjs' })

        await request(app)
            .delete(`/courses/${createRes.body.id}`)
            .expect(204)

        await request(app)
            .get(`/courses/${createRes.body.id}`)
            .expect(404)
    })

    // ==============================
    // QUERY FILTER
    // ==============================

    it('GET /courses?title=js should filter courses', async () => {
        await request(app).delete('/clear')

        await request(app).post('/courses').send({ title: 'nodejs' })
        await request(app).post('/courses').send({ title: 'react' })

        const res = await request(app)
            .get('/courses?title=js')
            .expect(200)

        expect(res.body.length).toBe(1)
        expect(res.body[0].title).toBe('nodejs')
    })

})
