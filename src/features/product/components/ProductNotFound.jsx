import Layout from "../../../components/layouts/Layout";
import Section from "../../../components/common/Section";
export default function ProductNotFound(error = null){
    return(
        <Layout>
                <Section>
                    <div className="text-center">
                        {
                            error && ( <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {error}
                            </h2>)
                        }
                       
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            The product you are looking for does not exist or has been removed.
                        </p>
                    </div>
                </Section>
            </Layout>
    )
}