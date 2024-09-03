"use client";
import Layout from "../../../components/layouts/Layout";
import FormLoginComponent from "../../auth/components/FormLogin";

export const LoginPage = () => {
    return (
        <>
            <Layout>
                <FormLoginComponent />
            </Layout>
        </>
    )
}

export default LoginPage;