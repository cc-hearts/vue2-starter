import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

const PAGES_DIR: string = path.resolve(process.cwd(), 'src/pages')
const INDEX_VUE_PATH: string = path.resolve(process.cwd(), 'src/pages/index.vue')

const isVueFile = (name: string): boolean => name.endsWith('.vue')

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const e of entries) {
    const full: string = path.resolve(dir, e.name)
    if (e.isDirectory()) {
      const nested = await walk(full)
      files.push(...nested)
    } else if (isVueFile(e.name)) {
      files.push(full)
    }
  }
  return files
}

function toRoutePath(filePath: string): string {
  const rel = path.relative(PAGES_DIR, filePath).replace(/\\/g, '/')
  const withoutExt = rel.replace(/\.vue$/, '')
  // convert dynamic segments like [id] -> :id
  const normalized = withoutExt.replace(/\[(.*?)\]/g, ':$1')

  // homepage maps to '/'
  if (normalized === 'index') return '/'

  // remove trailing /index for nested page indexes
  const cleaned = normalized.replace(/\/index$/, '')
  return `/${cleaned}`
}

function buildRoutes(paths: string[]): string[] {
  return Array.from(new Set(paths.map(toRoutePath)))
    // exclude dynamic routes from homepage links
    .filter((p) => p !== '/' && !p.includes(':'))
    .sort()
}

function generateIndexVue(routes: string[], styleBlock: string): string {
  const routesArr = JSON.stringify(routes, null, 2)
  return `<script>
export default {
  name: 'HomePage',
  data() {
    return {
      routes: ${routesArr}
    }
  }
}
</script>

<template>
  <div class="p-4">
    <h1>Vue2 Starter</h1>
    <div class="navigation">
      <h2>演示页面</h2>
      <ul>
        <li v-for="route in routes" :key="route">
          <router-link :to="route">
            {{ route }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

${styleBlock}
`
}

async function main(): Promise<void> {
  const vueFiles = await walk(PAGES_DIR)
  const routes = buildRoutes(vueFiles)
  let styleBlock: string = `
<style scoped>
.navigation {
  margin-top: 20px;
}

.navigation ul {
  list-style: none;
  padding: 0;
}

.navigation li {
  margin: 10px 0;
}

.navigation a {
  color: #409eff;
  text-decoration: none;
  font-size: 16px;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>
`.trim()

  try {
    const existing = await readFile(INDEX_VUE_PATH, 'utf-8')
    const match: RegExpMatchArray | null = existing.match(/<style[\s\S]*?<\/style>/)
    if (match) {
      styleBlock = match[0]
    }
  } catch {
    // ignore, use default style
  }

  const content = generateIndexVue(routes, styleBlock)
  await writeFile(INDEX_VUE_PATH, content, 'utf-8')
  console.log('Updated index.vue with routes:', routes)
}

main().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})