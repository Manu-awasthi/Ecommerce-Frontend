import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Auth({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 redirect after login (checkout or home)
  const redirectTo = location.state?.from || "/";

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  /* ======================
     INPUT HANDLER
  ====================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({});
  };

  /* ======================
     VALIDATION
  ====================== */
  const validate = () => {
    const err = {};

    if (isSignup && !formData.name.trim()) {
      err.name = "Name is required";
    }

    if (!formData.email.trim()) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // 🔐 fake auth (frontend only)
    const userData = {
      name: isSignup ? formData.name : "User",
      email: formData.email
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);

    setTimeout(() => {
      setLoading(false);
      navigate(redirectTo); // ✅ IMPORTANT FIX
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl text-center text-blue-400 mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          {isSignup && (
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded outline-none"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded outline-none"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-center mt-4 text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "New user?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-1 text-blue-400 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
