import React from 'react'

function Login() {
  return (
    <div>
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
  )
}

export default Login