import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/App.jsx'),
  route('sign-in/*', 'routes/sign-in.jsx'),
]

