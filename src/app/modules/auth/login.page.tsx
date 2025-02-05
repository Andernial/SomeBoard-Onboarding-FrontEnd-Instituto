function LoginPage(){
    return(
        <div className="flex flex-col items-center bg-amber-100 min-h-screen w-full">
        <header className="flex justify-center items-center h-30">
            <h1 className="text-4xl font-serif text-mint-500">Login</h1>
        </header>
            <div className="h-64 w-56 bg-blue-50 rounded-2xl">
                    <form action="" className="flex flex-col justify-center items-center h-full text-white text-center">
                        <label htmlFor="name" className="text-black">name</label>
                        <input type="text" className="bg-blue-900 w-[80%] rounded-xs  p-1" />
                        <label htmlFor="email" className="mt-4 text-black">email</label>
                        <input className="bg-blue-900 w-[80%] rounded-xs p-1" type="text" />
                    </form>
            </div>
        </div>
      
    )
}


export default LoginPage
