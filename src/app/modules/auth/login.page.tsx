function LoginPage(){
    return(
        <div className="flex flex-col items-center bg-amber-100 min-h-screen w-full">
        <header className="flex justify-center items-center h-30">
            <h1 className="text-4xl font-serif text-purple-300">Login</h1>
        </header>
            <div className="h-64 w-56 bg-white rounded-2xl text-center flex flex-col justify-center items-center">
                  <form action="" className="flex flex-col justify-center items-center">
                    <label htmlFor="email">email</label>
                  <input type="text" className="generic-input" name="email" id="" />
                  <label htmlFor="password">password</label>
                  <input type="text" className="generic-input" name="password" id="" />
                  </form>
            </div>
        </div>
      
    )
}


export default LoginPage
