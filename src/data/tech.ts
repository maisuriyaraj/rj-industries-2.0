import {
  siAngular,
  siBootstrap,
  siCss,
  siExpress,
  siFastify,
  siFirebase,
  siGit,
  siHtml5,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedux,
  siRender,
  siSequelize,
  siShadcnui,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZod,
  type SimpleIcon,
} from 'simple-icons';

export type TechId =
  | 'nextjs'
  | 'react'
  | 'typescript'
  | 'tailwind'
  | 'html'
  | 'css'
  | 'fastify'
  | 'node'
  | 'express'
  | 'postgresql'
  | 'sequelize'
  | 'mongodb'
  | 'mysql'
  | 'angular'
  | 'redux'
  | 'bootstrap'
  | 'mui'
  | 'socketio'
  | 'git'
  | 'firebase'
  | 'vercel'
  | 'render'
  | 'zod'
  | 'shadcn';

export type Tech = { id: TechId; name: string; icon: SimpleIcon };

export const tech: Record<TechId, Tech> = {
  nextjs: { id: 'nextjs', name: 'Next.js', icon: siNextdotjs },
  react: { id: 'react', name: 'React', icon: siReact },
  typescript: { id: 'typescript', name: 'TypeScript', icon: siTypescript },
  tailwind: { id: 'tailwind', name: 'Tailwind CSS', icon: siTailwindcss },
  html: { id: 'html', name: 'HTML5', icon: siHtml5 },
  css: { id: 'css', name: 'CSS', icon: siCss },
  fastify: { id: 'fastify', name: 'Fastify', icon: siFastify },
  node: { id: 'node', name: 'Node.js', icon: siNodedotjs },
  express: { id: 'express', name: 'Express', icon: siExpress },
  postgresql: { id: 'postgresql', name: 'PostgreSQL', icon: siPostgresql },
  sequelize: { id: 'sequelize', name: 'Sequelize', icon: siSequelize },
  mongodb: { id: 'mongodb', name: 'MongoDB', icon: siMongodb },
  mysql: { id: 'mysql', name: 'MySQL', icon: siMysql },
  angular: { id: 'angular', name: 'Angular', icon: siAngular },
  redux: { id: 'redux', name: 'Redux', icon: siRedux },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: siBootstrap },
  mui: { id: 'mui', name: 'Material UI', icon: siMui },
  socketio: { id: 'socketio', name: 'Socket.IO', icon: siSocketdotio },
  git: { id: 'git', name: 'Git', icon: siGit },
  firebase: { id: 'firebase', name: 'Firebase', icon: siFirebase },
  vercel: { id: 'vercel', name: 'Vercel', icon: siVercel },
  render: { id: 'render', name: 'Render', icon: siRender },
  zod: { id: 'zod', name: 'Zod', icon: siZod },
  shadcn: { id: 'shadcn', name: 'shadcn/ui', icon: siShadcnui },
};
