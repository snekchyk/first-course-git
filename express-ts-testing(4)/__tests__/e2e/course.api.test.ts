import request from 'supertest'
import {app} from '../../src/'

let server: any;

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/clear')
    })
    
    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses?title=front')
            .expect(200, [])
    })

    it('should return 404 for non-existent course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(404)
    })

    it('should not create course with incorrect input data', async () => {
        await request(app)
            .post('/courses')
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/courses')
            .expect(200, [])
    })
    let createdCourse: any = null
    it('should create course with correct input data', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'new course'})
            .expect(201)

        const createdCourse = createResponse.body

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'new course'
        })

        await request(app)
            .get('/courses')
            .expect(200, [createdCourse])
        
    })


    it('should not update course that not exist', async () => {
        await request(app)
            .put('/courses/' + -100)
            .send({title: 'good title'})
            .expect(404)
        
    })

    it('should update course with correct input data', async () => {
        await request(app)
            .put('/courses/' + createdCourse.id)
            .send({title: 'good new title'})
            .expect(204)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(200, {
                ...createdCourse,
                title: 'good new title'
            })
        
    })

    
})