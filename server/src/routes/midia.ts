import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import fs from 'fs';
import path from 'path';


export async function midiasRoutes(app: FastifyInstance) {

    app.get('/midias', async (request) => {
      const midias = await prisma.midia.findMany({
        orderBy: {
          titulo: 'asc',
        },
      })
      return midias.map((midia) => {
        return {
          id: midia.id,
          grupo:midia.grupo,
          editora:midia.editora,
          compositor: midia.compositor,
          capa: midia.capa,
          titulo: midia.titulo,
          autor: midia.autor, 
          tipo: midia.tipo,
          path: midia.path      
        }
      })
    })

    //Caminho para reproduzir um vídeo
  app.get('/videos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });
  
    const { id } = paramsSchema.parse(request.params);
  
    const midia = await prisma.midia.findUniqueOrThrow({
      where: {
        id,
      },
    });
  
    // Obtém o caminho do vídeo
    const titulo = midia.titulo;
    const autor =midia.autor
    const path = midia.path;
    const capa =midia.capa;
    const userId=midia.userId;
    const midias={path,capa,autor, titulo, userId};
    return midias;
  });
  
    app.get('/midias/:id', async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string(),
        })
      
          const { id } = paramsSchema.parse(request.params)
      
          const midia = await prisma.midia.findUniqueOrThrow({
            where: {
              id,
            },
          })
      
        return midia
    })

    app.get('/midia/:userId', async (request) => {
      const { userId } = request.params;
      const { admin } = request.query;
      
      let where = {};
      
      if (admin === 'true') {
        // Exibir todas as mídias para usuários com admin=true
        where = {}; // Não aplicar nenhum filtro
      } else {
        // Exibir apenas as mídias correspondentes ao userId para usuários com admin=false
        where = {
          userId,
        };
      }
      
      const midias = await prisma.midia.findMany({
        where,
        orderBy: {
          titulo: 'asc',
        },
      });
      
      return midias.map((midia) => {
        return {
          id: midia.id,
          capa: midia.capa,
          titulo: midia.titulo,
          autor: midia.autor,
          tipo: midia.tipo,
          path: midia.path,
          userId: midia.userId,
        };
      });
    });

    app.post('/gravar/midias', async (request) => {
      console.log("1")
            const bodySchema = z.object({
              titulo: z.string(),
              autor: z.string(),
              compositor: z.string(),
              editora: z.string(),
              grupo: z.string(),
              historia: z.string(),
              periodo: z.string(),
              capa: z.string(),
              tipo: z.string(),
              path: z.string(),
              userId: z.string()
            })
            const { titulo, path, tipo, autor, compositor, editora, grupo, historia, periodo, capa, userId } = bodySchema.parse(request.body)

            const midia = await prisma.midia.create({
              data: {
                titulo, tipo, autor, compositor, path, editora, grupo, historia, periodo, capa, userId,
              },
            })

          
            return midia
    })

    app.get('/midias/search/:titulo', async (request, reply) => {
      const paramsSchema = z.object({
          titulo: z.string(),
      })
    
        const { titulo } = paramsSchema.parse(request.params)
    
        const midia = await prisma.midia.findMany({
          where: {
            titulo,
          },
        })
    
      return midia
    })

    app.get('/midias/search/autor/:autor', async (request, reply) => {
      const paramsSchema = z.object({
          autor: z.string(),
      })
    
        const { autor } = paramsSchema.parse(request.params)
    
        const midia = await prisma.midia.findMany({
          where: {
            autor,
          },
        })
    
      return midia
    })
  
    app.post('/midias', async (request) => {
            const bodySchema = z.object({
              titulo: z.string(),
              autor: z.string(),
              compositor: z.string(),
              editora: z.string(),
              grupo: z.string(),
              historia: z.string(),
              periodo: z.string(),
              capa: z.string(),
              tipo: z.string(),
              path: z.string(),
              userId: z.string()
            })
        
            const { titulo, path,tipo, autor,compositor, editora, grupo, historia, periodo, capa,userId } = bodySchema.parse(request.body)
        
            const midia = await prisma.midia.create({
              data: {
                titulo,tipo, autor,compositor, path, editora, grupo, historia, periodo,capa,userId
              },
            })
        
            return midia
    })
  
    app.put('/midias/:id', async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
          })
      
          const { id } = paramsSchema.parse(request.params)
      
          const bodySchema = z.object({
            titulo: z.string(),
            autor: z.string(),
            compositor: z.string(),
            editora: z.string(),
            grupo: z.string(),
            historia: z.string(),
            periodo: z.string(),
            tipo: z.string(),
            path: z.string(),
          })
      
          const { titulo,tipo,path, autor,compositor, editora, grupo, historia, periodo } = bodySchema.parse(request.body)
      
          let midia = await prisma.midia.findUniqueOrThrow({
            where: {
              id,
            },
          })
      
          midia = await prisma.midia.update({
            where: {
              id,
            },
            data: {
                titulo, tipo, path, autor,compositor, editora, grupo, historia, periodo
            },
          })
      
          return midia
    })

    app.put('/actualizar/midias/:id', async (request, reply) => {
      console.log("1")

      try {
        const paramsSchema = z.object({
          id: z.string().uuid(),
        });
    
        const { id } = paramsSchema.parse(request.params);
        const bodySchema = z.object({
          titulo: z.string(),
          autor: z.string(),
          compositor: z.string(),
          editora: z.string(),
          grupo: z.string(),
          historia: z.string(),
          periodo: z.string(),
          tipo: z.string(),
          path: z.string(),
          capa: z.string(),
        });
        const { titulo, tipo, path, autor, compositor, editora, grupo, historia, periodo, capa } = bodySchema.parse(request.body);

        let midia = await prisma.midia.findUniqueOrThrow({
          where: {
            id,
          },
        });
        midia = await prisma.midia.update({
          where: {
            id,
          },
          data: {
            titulo,
            tipo,
            path,
            autor,
            compositor,
            editora,
            grupo,
            historia,
            periodo,
            capa,
          },
        });

        reply.send(midia);
      } catch (error) {
        console.error('Erro ao atualizar a mídia:', error);
        reply.status(500).send('Erro ao atualizar a mídia');
      }
    });
  
    app.delete('/midias/:id', async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      });
      
      try {
        const { id } = paramsSchema.parse(request.params);
        
        const midia = await prisma.midia.findUniqueOrThrow({
          where: {
            id,
          },
        });
        await prisma.midia.delete({ where: { id } })
        // Faça as operações necessárias para excluir a "midia"
        // Exemplo: ;
    
        return { message: 'Midia excluída com sucesso' };
      } catch (error) {
        reply.status(404).send({ error: 'Midia não encontrada' });
      }
    });
    
}