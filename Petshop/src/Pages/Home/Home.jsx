
import Testimonial from "../Testimonial";
import BestDeal from "./BestDeal";
import Hero from "./Hero";
import HomeBlog from "./HomeBlog";
import Newarrivalproduct from "./Newarrivalproduct";
import Newofferbanner from "./Newofferbanner";
import Offerbanner from "./Offerbanner";
import Serive from "./Serive";
import SpecialProduct from "./SpecialProduct";

function Home() {
  

  return (
    <>
     
      <Hero />
      <Offerbanner />
      <SpecialProduct />
      <BestDeal />
      <Newarrivalproduct />
      <Newofferbanner />
      <Testimonial />
      <HomeBlog />
      <Serive />
    </>
  );
}

export default Home;
