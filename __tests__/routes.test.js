const request = require('supertest')
const app = require('../app')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/api/v1/posts/').send({
      userId: 1,
      title: 'test is cool',
      content: 'Lorem ipsum',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })

  it('should fetch a single post', async () => {
    const postId = 1
    const res = await request(app).get(`/api/v1/posts/${postId}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('post')
  })

  it('should fetch all posts', async () => {
    const res = await request(app).get('/api/v1/posts/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('posts')
    expect(res.body.posts).toHaveLength(1)
  })

  it('should update a post', async () => {
    const res = await request(app).put('/api/v1/posts/1').send({
      userId: 1,
      title: 'updated title',
      content: 'Lorem ipsum',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('post')
    expect(res.body.post).toHaveProperty('title', 'updated title')
  })

  it('should return status code 500 if db constraint is violated', async () => {
    const res = await request(app).post('/api/v1/posts/').send({
      title: 'test is cool',
      content: 'Lorem ipsum',
    })
    expect(res.statusCode).toEqual(500)
    expect(res.body).toHaveProperty('error')
  })

  it('should delete a post', async () => {
    const res = await request(app).delete('/api/v1/posts/1')
    expect(res.statusCode).toEqual(204)
  })

  it('should respond with status code 404 if resource is not found', async () => {
    const postId = 1
    const res = await request(app).get(`/api/v1/posts/${postId}`)
    expect(res.statusCode).toEqual(404)
  })
})
