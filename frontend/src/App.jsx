import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [page, setPage] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let url = `http://localhost:3001/api/v1/auth/${
        page == 'login' ? 'login' : 'register'
      }`

      let data = { email, password }

      if (page == 'register') {
        data['name'] = name
      }

      const response = await axios.post(url, data)

      console.log(response.data)

      if (page == 'login') {
        if (response.data.success) {
          // GO TO DASHBOARD
          localStorage.setItem('token', response.data.token)
          alert(JSON.stringify(response.data.data))
        } else {
          alert(response.data?.message)
        }
      } else {
        if (response.data.success) {
          alert(response.data.message)
          setPage('login')
        }
      }
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen max-w-[1440px] mx-auto p-4 flex justify-center items-center'>
      <div className='h-[500px] w-[350px]'>
        <h1 className='text-bold text-2xl text-black'>
          {page == 'login' ? 'Login' : 'Register'} Page
        </h1>
        <form onSubmit={handleSubmit} className='transition-all'>
          {page == 'register' && (
            <Input
              className='my-4'
              placeholder='Name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            className='my-4'
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className='my-4'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            className='text-xs mb-4 text-right'
            onClick={() => setPage(page == 'login' ? 'register' : 'login')}>
            {page == 'login'
              ? "Don't have an account? Register"
              : 'Have an account? Login'}
          </p>
          <Button className='w-full' type='submit'>
            {page == 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default App
