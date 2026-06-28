import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useLogin from "../hooks/useLogin";
import { ShipWheelIcon } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({ email: "", password: "" });

  const { error, isPending, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(formState, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        navigate("/");
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-8">
          <div className="mb-6 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
          <p className="text-sm opacity-70 mb-6">
            Sign in to continue your language exchange journey.
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || error.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@gmail.com"
                className="input input-bordered w-full"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={formState.password}
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                required
              />
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm opacity-70">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;