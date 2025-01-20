import Banner from "../../components/Home/Banner";
import Feedback from "../../components/Home/Feedback";
import OurImpact from "../../components/Home/OurImpact";
import PopularCamps from "../../components/Home/PopularCamps";

const Home = () => {
    return (
        <div>
            {/* Banner component */}
           <Banner />

           {/* Popular Camps component */}
           <PopularCamps />

           {/* Feedback component */}
           <Feedback />

           {/* Our Impact component */}
           <OurImpact />
        </div>
    );
};

export default Home;