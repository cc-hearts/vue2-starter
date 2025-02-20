import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

export const handlers = [
  http.get('http://example.com/user', () => {
    return HttpResponse.json({ id: 1, name: 'John Doe' })
  }),
]

export const worker = setupWorker(...handlers)
