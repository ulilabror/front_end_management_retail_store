import TabView from "../features/ppob/components/TabViewPPOB";
import Layout from "../components/layouts/Layout";
import Container from "../components/layouts/Container";

const tabs = [
    {
        label: "Token Listrik",
        image: "https://source.unsplash.com/featured/?electricity",
        text: "Listrik pra bayar. Beli token listrik untuk mengisi ulang saldo listrik prabayar Anda."
    },
    {
        label: "Pulsa",
        image: "https://source.unsplash.com/featured/?mobile,phone",
        text: "Pembelian voucher pulsa untuk berbagai operator seperti Simpati, XL, Indosat, IM3, dll."
    },
    {
        label: "Kuota",
        image: "https://source.unsplash.com/featured/?internet,data",
        text: "Pembelian paket data untuk berbagai operator seperti Simpati, XL, Indosat, dll."
    },
    {
        label: "Rekening Listrik",
        image: "https://source.unsplash.com/featured/?bill,payment",
        text: "Pembayaran rekening listrik untuk postpaid dan non-taglist."
    },
    {
        label: "Telepon Rumah/Kantor",
        image: "https://source.unsplash.com/featured/?telephone,landline",
        text: "Pembayaran rekening telepon rumah atau kantor (JASTEL)."
    },
    {
        label: "TV Kabel",
        image: "https://source.unsplash.com/featured/?tv,cable",
        text: "Pembayaran tagihan TV Kabel seperti Indiehome, Trans Vision, dan lain-lain."
    }
];



export default function PPOBPage() {
    return (
        <Layout>
            <Container>
                <TabView tabs={tabs} />
            </Container>
        </Layout>
    )
}