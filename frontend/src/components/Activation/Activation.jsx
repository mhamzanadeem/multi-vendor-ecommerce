import { React, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Activation() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v2/user/activation`,
          { activation_token: token },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data.success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (err) {
        setStatus("error");
        setError(
          err.response?.data?.message ||
            "Activation failed. The link may be expired."
        );
      }
    };
    activateAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {status === "loading" && (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Activating your account...</p>
            </div>
          )}
          {status === "success" && (
            <div>
              <div className="text-green-600 text-5xl mb-4">&#10003;</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Activated!
              </h2>
              <p className="text-gray-600 mb-4">
                Your account has been successfully activated. You will be
                redirected to login.
              </p>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Go to Login
              </Link>
            </div>
          )}
          {status === "error" && (
            <div>
              <div className="text-red-600 text-5xl mb-4">&#10007;</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Activation Failed
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Try signing up again
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activation;
