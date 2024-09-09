import Container from "../../../components/layouts/Container";
import Layout from "../../../components/layouts/Layout";
import AddProductForm from "../components/AddProductForm";
const AddProductPage = () => {
    return (
        <>
            <Layout>
                <Container>
                    <AddProductForm />
                </Container>
            </Layout>
        </>
    )
}

export default AddProductPage;