export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-blue-500 rounded-lg p-6 shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-white mb-4">Login</h1>
        <form action="/login" method="post" className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <label htmlFor="password" className="text-gray-700 mb-2 mt-4">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
