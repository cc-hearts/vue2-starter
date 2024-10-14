import type { Dirent } from 'fs'
import { readdir } from 'fs/promises'
import { resolve, relative, dirname } from 'path'

const ROOT_PATH = resolve(process.cwd(), "src/pages")
interface Router {
  router: string,
  component?: string
}
export const readRouterDir = async (path: string, parentRouterList: Router[] = []) => {
  const dirs = await readdir(path, { withFileTypes: true })
  const fileList: Dirent[] = []
  const floderList: Dirent[] = []
  dirs.forEach(dir => {
    if (dir.isDirectory()) {
      floderList.push(dir)
    } else {
      fileList.push(dir)
    }
  })



  fileList.forEach(fileDir => {
    const fileRelativePath = relative(ROOT_PATH, resolve(path, fileDir.name))
    const router = '/' + fileRelativePath.split('.').slice(0, -1).join('.')
    parentRouterList.push({
      router,
      component: `() => import(${relative(process.cwd(), resolve(path, fileDir.name))})`
    })

  })



}


console.log(await readRouterDir(ROOT_PATH))
