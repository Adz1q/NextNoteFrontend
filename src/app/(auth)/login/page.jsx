import login from "@/lib/auth";

const Login = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center min-h-full">
        <div>Enter your credentials</div>
        <form className="flex flex-col gap-4" method="post" action={login}>
            <input type="text" placeholder="E-mail" name="email" className="border-solid"/>
            <input type="password" placeholder="Password" name="password"/>
            <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;