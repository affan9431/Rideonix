import { QRCode } from "react-qrcode-logo";

const amount = 1; // dynamic amount
const upiURL = `upi://pay?pa=8092393403@ptyes&pn=Affan%20Sayeed&am=${amount}&cu=INR&tn=Rideonix%20Payment`;

export default function QRUPIPayment() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold mb-2">Scan to Pay</p>
      <QRCode value={upiURL} size={200} />
      <p className="mt-4 text-center text-sm opacity-70">
        Scan using any UPI app 📱
      </p>
    </div>
  );
}
