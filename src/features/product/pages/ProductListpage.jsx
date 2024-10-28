import Layout from "../../../components/layouts/Layout";
import ProductList from "../components/ProductList";


export default function ProductListPage({ products }) {
    return (
        <>
            <Layout>
                <ProductList products={products} />
            </Layout>
        </>
    )
}