import { BackGround } from "@/components/Background";
import { CardSpotlight } from "@/components/CardSpotLight";
import LeftSideBar from "@/components/LeftSideBar";
import { Reveal } from "@/components/Reveal";
import { ShootingStars } from "@/components/ShootingStar";
import { SparklesPreview } from "@/components/SparklesPreview";
import { TracingBeam } from "@/components/TracingBeam";

export default function Home() {
  return (
    <div className="relative">
      <div className=" absolute z-10 left-[-8rem] mt-10">  <SparklesPreview/></div>
      <LeftSideBar/>
    
      <TracingBeam>
        <ShootingStars/>
        <BackGround >
          <div className="grid grid-cols-4 gap-10 z-50 cursor-pointer ">
            { [1, 2, 3, 5, 8, 13, 15,20].map((item) => (
              <div className="expcard" key={item}>
                <CardSpotlight className="h-[130px] w-[130px] flex items-center justify-center">
                  <div className="text-neutral-200 relative z-20">
                    {item}
                  </div>
                </CardSpotlight>
              </div>
            ))}
            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="expcard">
                <CardSpotlight className="h-[130px] w-[130px] flex items-center justify-center">
                  <div className="text-neutral-200 relative z-20">
                    24
                  </div>
                </CardSpotlight>
              </div>
             
            </div>
          </div>
       
              <Reveal/>
          
        </BackGround>
     
      </TracingBeam>

    </div>
  );
}
