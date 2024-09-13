import TabView from "../features/ppob/components/TabViewPPOB";
import Layout from "../components/layouts/Layout";
import Container from "../components/layouts/Container";
import PaymentMethods from "../features/payment/components/PaymentMethods";
import { ProductList } from "../features/ppob/components/productList";


const tabs = [
    {
        label: "Token Listrik",
        image: "https://source.unsplash.com/featured/?electricity",
        sublabel: ["PLN"],
        text: "Listrik pra bayar. Beli token listrik untuk mengisi ulang saldo listrik prabayar Anda.",
        forms: ["id"] // Form untuk Token Listrik
    },
    {
        label: "Pulsa",
        image: "https://source.unsplash.com/featured/?mobile,phone",
        sublabel: ["XL", "TELKOMSEL", "Indosat", "Tri", "Smartfren"],
        text: "Pembelian voucher pulsa untuk berbagai operator seperti Simpati, XL, Indosat, IM3, dll.",
        forms: ["phone_number"] // Form untuk Pulsa (misalnya ID dan nomor telepon)
    },
    {
        label: "Kuota",
        image: "https://source.unsplash.com/featured/?internet,data",
        sublabel: ["XL", "TELKOMSEL", "Indosat", "Tri", "Smartfren"],
        text: "Pembelian paket data untuk berbagai operator seperti Simpati, XL, Indosat, dll.",
        forms: ["phone_number"] // Form untuk Kuota
    },
    {
        label: "Rekening Listrik",
        image: "https://source.unsplash.com/featured/?bill,payment",
        sublabel: ["PLN"],
        text: "Pembayaran rekening listrik untuk postpaid dan non-taglist.",
        forms: ["account_number"] // Form untuk rekening listrik
    },
    {
        label: "Telepon Rumah/Kantor",
        image: "https://source.unsplash.com/featured/?telephone,landline",
        sublabel: ["Telkom", "Indosat"],
        text: "Pembayaran rekening telepon rumah atau kantor (JASTEL).",
        forms: ["phone_number"] // Form untuk telepon rumah/kantor
    },
    {
        label: "TV Kabel",
        image: "https://source.unsplash.com/featured/?tv,cable",
        sublabel: ["IndiHome", "Trans Vision", "First Media"],
        text: "Pembayaran tagihan TV Kabel seperti IndiHome, Trans Vision, dan lain-lain.",
        forms: ["customer_id"] // Form untuk TV kabel
    }
];

export default function PPOBPage() {
    return (
        <Layout>
            <Container>
                <TabView tabs={tabs} />
                <PaymentMethods />
            </Container>
        </Layout>
    )
}