import { useEffect, useState } from "react";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";

const ChefRecommended = () => {
    const [recommended, setRecommended] = useState([]);


    useEffect(() => {
        fetch("menu.json")
            .then(res => res.json())
            .then(data => {
                const sort = data.slice(0, 3);
                setRecommended(sort);
            })
    }, []);


    return (
        <section className="max-w-5xl mx-auto px-2">
            <SectionTitle subHeading={'---Should Try---'} heading={'CHEF RECOMMENDS'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    recommended.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                        <div className="space-y-4 grow">
                            <img src={item.image} alt="" />
                            <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                            <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                        </div>
                        <button className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                    </div>)
                }
            </div>
        </section>
    );
};

export default ChefRecommended;