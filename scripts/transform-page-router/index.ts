import type { Dirent } from 'fs'
import { readdir, writeFile } from 'fs/promises'
import { resolve, relative, extname } from 'path'
import { inspect } from 'util'

const ROOT_PATH = resolve(process.cwd(), "src/pages")

const DEFAULT_FILE_NAME = 'index.vue'

interface Router {
  path: string,
  component?: string
  redirect?: string
  children?: Router[]
}

const formatRouterPath = (path: string) => {
  return path.replaceAll("\\", "/")
    .replace(/\[(.*?)\]/, ":$1")
}

const isVueFile = (fileName: string) => {
  return extname(fileName) === '.vue'
}

const fileRemoveExt = (parentPath: string, filename: string) => {
  return formatRouterPath(parentPath + filename.split('.').slice(0, -1).join('.'))
}

export const readRouterDir = async (path: string, parentRouterList: Router[] = [], parentPath = '') => {
  const dirs = await readdir(path, { withFileTypes: true })
  const fileList: Dirent[] = []
  const floderList: Dirent[] = []

  dirs.forEach(dir => {
    if (dir.isDirectory()) {
      floderList.push(dir)
    } else if (isVueFile(dir.name)) {
      fileList.push(dir)
    }
  })



  fileList.forEach(fileDir => {
    let router = fileRemoveExt(parentPath, fileDir.name)
    if (router === '/index') {
      router = '/'
    }
    parentRouterList.push({
      path: router,
      component: `() => import('${relative(process.cwd(), resolve(path, fileDir.name))
        .replaceAll("\\", "/")
        .replace(/src/, "@")
        }')`
    })

  })


  const fns = floderList.map(async floder => {
    let currentRouter: Router | undefined = parentRouterList.find(target => target.path === `/${floder.name}`)

    if (!currentRouter) {
      const router = formatRouterPath(`${parentPath}${floder.name}`)
      currentRouter = {
        path: router,
      }

      parentRouterList.push(currentRouter)
    }
    const children: Router[] = []
    await readRouterDir(resolve(path, floder.name), children)

    currentRouter.children = [...(currentRouter.children || []), ...children];
    if (!currentRouter.component) {
      const index = currentRouter.children.findIndex(target => target.path === DEFAULT_FILE_NAME.replace(".vue", ""))
      if (index > -1) {
        const [target] = currentRouter.children.splice(index, 1)
        currentRouter.component = target?.component
      }
    }
  })
  return Promise.all(fns)
}

const rootRouterTree = []
await readRouterDir(ROOT_PATH, rootRouterTree, '/')

if (process.env.NODE_ENV !== 'production') {
  console.log(inspect(rootRouterTree, false, null, true))
}


const routerCtx = JSON.stringify(rootRouterTree, null, 2)
  .replaceAll(/\"\(\) => import\((.*?)\)\"/g, '() => import($1)')
await writeFile(resolve(process.cwd(), "src/router/auto-router.ts"), 'export default ' + routerCtx)


