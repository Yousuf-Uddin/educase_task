import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { RoutePath } from "../types";

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className=" justify-end pb-10 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-popx-text mb-2">
          Welcome to PopX
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>

      <div className="space-y-4">
        <Button onClick={() => navigate(RoutePath.SIGNUP)}>
          Create Account
        </Button>
        <Button variant="secondary" onClick={() => navigate(RoutePath.SIGNIN)}>
          Already Registered? Login
        </Button>
      </div>
    </Layout>
  );
};
