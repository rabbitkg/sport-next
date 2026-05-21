import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";



const josefin = Josefin_Sans({
  subsets: ["latin"],
});



export const metadata = {
  title: "SportNest",
  description: "Sports Facility Booking Management System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme='lemonade'
      className={`${josefin.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">

          {children}

        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ marginTop: "125px" }}
          theme="dark"
        />
      </body>
    </html>
  );
}
