import { useEffect } from "react";
// import axios from "axios";

import Carousel from "../../components/homepage/carousel/Carousel.component";
import HomepageBody from "../../components/homepage/HomepageBody.component";
import Footer from "../../components/homepage/Footer.component";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Navbar from "components/nav/Nav.component";

const HomePage = () => {
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        (async () => {
            const { data, status } = await axiosPrivate({
                method: 'get',
                url: 'cart/count'
            })
        })();

        (async () => {
            const { data, status } = await axiosPrivate({
                method: 'get',
                url: 'wishlist/count'
            })
        })();
    }, [])


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