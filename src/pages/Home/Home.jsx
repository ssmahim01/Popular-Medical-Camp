import Banner from "../../components/Home/Banner";
import Feedback from "../../components/Home/Feedback";
import OurImpact from "../../components/Home/OurImpact";
import PopularCamps from "../../components/Home/PopularCamps";
import Doctors from "../../components/Home/Doctors";
import HealthTips from "../../components/Home/HealthTips";
import OurServices from "../../components/Home/OurServices";

const Home = () => {
    return (
        <div>
            {/* Banner component */}
           <Banner />

           {/* Popular Camps component */}
           <PopularCamps />

           {/* Doctors component */}
           <Doctors />

            {/* Our Services component */}
            <OurServices />

           {/* Health Tips component */}
           <HealthTips />

           {/* Feedback component */}
           <Feedback />

           {/* Our Impact component */}
           <OurImpact />
        </div>
    );
};

export default Home;