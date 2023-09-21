import fastify from 'fastify'
import { midiasRoutes } from './routes/midia'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import { userRoutes } from './routes/user'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'
import { commentsRoutes } from './routes/comment'


const app = fastify()


app.register(multipart)

app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads',
})

app.register(jwt, {
    secret: "multimidia",
})

app.register(cors, {
    origin: true,
})

app.register(userRoutes)
app.register(midiasRoutes)
app.register(commentsRoutes)
app.register(uploadRoutes)


app.listen({
    port:3333,
    host: '0.0.0.0',
}).then(()=>{
    console.log("Correndo na porta 3333")
})

