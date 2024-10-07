

import React from "react";
import slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import Footer from "../components/Footer";
const HomePage = () => {

  const data = [
    {
      name:'koifish 1 ',
      img:'https://picsum.photos/seed/picsum/200'
    },
    {
      name:'koifish 2 ',
      img:'https://cafishvet.com/wp-content/uploads/2021/04/20150527-_DSC4345-Edit-1024x701.jpg'
    },
    {
      name:'koifish 3 ',
      img:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTNGC9HP0kvPVjRmDosz7w_OwVSLdTEhI0ISVS4U8jsc8BDkahQ'
    }
  ]

    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <div className="text-white">
    <h1 className="text-5xl text-center mb-10">WElCOME TO OUR SERVICES</h1>
    <div className="flex mx-40 ">
      
      <img className="w-[400px] mr-10 " src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7cb217b1-79b0-4951-b667-cea9c82230bd/dga94im-3ed511aa-7d87-47fd-9762-046d9a8338a2.jpg/v1/fill/w_600,h_607,q_75,strp/koi_fish_by_elysekh_dga94im-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjA3IiwicGF0aCI6IlwvZlwvN2NiMjE3YjEtNzliMC00OTUxLWI2NjctY2VhOWM4MjIzMGJkXC9kZ2E5NGltLTNlZDUxMWFhLTdkODctNDdmZC05NzYyLTA0NmQ5YTgzMzhhMi5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.4Lfl1wB5qIfFR47AUClV85BCfwZQ7aCjW7yQGYSvo5I"></img>
      <p >With a tradition of more than 100-years in “Nishikigoi”farming,
     we had so far enjoyed in supplying our Specials to many Nishikigoi-lovers through our persistent efforts for the breed improvement.
     The terrible 2004-earthquake, however, flattened all our farming facilities and endangered our industry.
      Now, we feel proud to announce our rebirth, with new power and tradition!
       Here in post-quake Yamakoshi, many new born Nishikigoi are lively and wonderfully swimming as if drawing a picture on a blank canvas.
        Just look at our “Matsuda Koi Farm”: we are back and happy to provide you with detailed information about every Nishikigoi from Yamakoshi,
         Niigata, Japan.<br/> <p className="text-red-400 mt-2">You can receive the best choices of Nishikigoi exclusively
           selected for you out of Tosai 30,000 and 2-years old 10,000 koi fish.</p> </p>
      
     </div>
     <div className=" mx-20 my-10">
      <h1 className="text-3xl text-center  border-b-2 border-white font-semibold">Recommended Koi from our website</h1>
      <div className="w-3/4 mx-auto">
      <div className="mt-20">
        <Slider {...settings}>
           {data.map((f) =>(
            <div className=" h-[400px]  bg-white rounded-xl">
              <div className="flex h-[300px] rounded-t-xl  bg-indigo-300">
                <img className=" object-fill w-full rounded-t-xl" src={f.img} alt="??" />
              </div>

              <div className="flex flex-col text-black justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{f.name}</p>
                <button className="bg-blue-400 hover:bg-blue-600 text-lg px-6 py-1 rounded-xl">Read more</button>
              </div>
            </div>
           ) )}
           </Slider>
      </div>
      </div>
     </div>
    <div className="mx-20 mb-5">
    <h1 className=" mb-2 text-2xl border-b-2 border-white">Countries We've Shipped Koi Fish</h1>
    <p>United States of America, Germany, United Arab Emirates, Indonesia, Austria, Netherlands, Canada, Cambodia, Singapore, Switzerland, Slovakia, Thailand, Denmark, Philippines, France, Brunei, Vietnam, Malaysia, South Korea, China and many more!

Please don't hesitate to contact us! Through e-mail or our social media, we are always happy to hear from you. Or to be familiar with us, visit Japan and see our koi farm!</p>
    </div>

    <div className="mx-20">
    <h1 className=" mb-2 text-2xl border-b-2 border-white">Koi Breed Variety</h1>
    <p>Kohaku, Sanke, Showa, Tancho, Shiroutsuri, Hiutsuri, Asagi, Akamatsuba, Shusui, Kikusui, Aigoromo, Budogoromo, Kumonryu, Benikumonryu, Chagoi, Soragoi, Yamabuki Ogon, Platinum and many more!</p>
    </div>
    <Footer/>
     </div>
};

export default HomePage;
