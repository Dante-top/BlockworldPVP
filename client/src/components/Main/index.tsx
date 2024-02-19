import Head from 'next/head'
import Navbar from '../Navbar/';
import Mobile from '../MobileGame';
import Intro from '../Intro';
import Purpose from '../Purpose';
import Mint from '../Mint/';
import Roadmap from '../Roadmap';
import Team from '../Team';
import Faq from '../Faq/';
import Footer from '../Footer/';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BattleArena from '../BattleArena';

const Home = () => {
  return (
    <main className="">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        {/* <title>BlockWorld</title>
        <meta name="description" content="You can mint NFT 1~10.(devnet working)" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script> */}
      </Head>
      <Navbar />
      <Mobile />
      <Intro />
      <BattleArena />
      <Purpose />
      <Mint />
      <Roadmap />
      <Team />
      <Faq />
      <Footer />
      {/* <Marketplace_header />
      <Marketplace_content /> */}
    </main>
  );
};

export default Home;



