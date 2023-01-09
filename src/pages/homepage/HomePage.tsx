import Carousel from "../../components/homepage/carousel/Carousel.component";
import HomepageBody from "../../components/homepage/HomepageBody.component";
import Footer from "../../components/homepage/Footer.component";
import Navbar from "components/nav/Nav.component";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Carousel />
            <HomepageBody />
            <Footer />
        </>
    )
}

export default HomePage;