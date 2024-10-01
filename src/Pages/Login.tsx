import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>

    <div className="border-2 border-slate-500 rounded-md p-10 bg-stone-100">
      <div className='text-center mb-10'>
    <h1 className='text-3xl grid' > SIGN IN</h1>
    </div>
        <div className="login-form">
            
            <form>
                <label >Username</label> <br/>
                <input className='border-2 rounded-md w-full' type="text" id="username" name="username"/><br/><br/>
                <label >Password </label> <br/>
                <input className='border-2 rounded-md w-full' type="password" id="password" name="password"/><br/><br/>
                
                <div className='text-center mb-3'>
                <button className='bg-blue-500 p-1 rounded-lg w-full text-white hover:bg-blue-700 ' type='submit'>Login</button>
            <a className='text-blue-500 text-sm hover:underline hover:decoration-auto' href='#'>Forgot password?</a>

                </div>
                </form>
                <div className='text-center'>
            <p>Don't have an account? <a className='text-blue-500 underline decoration-auto ' href="Register.tsx">Sign up</a></p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login