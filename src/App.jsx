import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tours from "@/components/Tours";
import BookingForm from "@/components/BookingForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Tours />
        <BookingForm />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

export default App;
