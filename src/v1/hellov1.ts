
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', c => {
  const msgs = [
    'The quick brown fox jumps over the lazy dog',
    'Find a needle in a haystack',
    'Find yourself a job you love and you will never have to work a day in your life',
    'The only thing we have to fear is fear itself',
    'To be or not to be, that is the question',
    'All that glitters is not gold',
    'A journey of a thousand miles begins with a single step',
    'The pen is mightier than the sword',
    'Actions speak louder than words',
    'Beauty is in the eye of the beholder',
    'The early bird catches the worm',
    'A picture is worth a thousand words',
    'When in Rome, do as the Romans do',
  ]

  const time = new Date().toJSON()
  const message = msgs[Math.floor(Math.random() * msgs.length)]

  return c.json({ time, message })
})

export default app
