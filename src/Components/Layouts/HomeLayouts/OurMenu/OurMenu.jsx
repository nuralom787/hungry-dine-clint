import { useEffect, useState } from "react";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";
import MenuItem from "../../SharedLayout/MenuItem/MenuItem";

const OurMenu = () => {
    const [menuData, setMenuData] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/menus')
            .then(res => res.json())
            .then(data => {
                const filterData = data.filter(dt => dt.category === 'popular');
                setMenuData(filterData)
            })
    }, []);


    return (
        <section className="max-w-5xl mx-auto px-2">
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check It Out---'} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    menuData.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="uppercase mt-20 px-10 py-3 font-medium text-xl text-[#1F2937] dark:text-white border-b-2 border-[#1F2937] dark:border-white rounded-xl bor font-Inter">view full menu</button>
        </section>
    );
};

export default OurMenu;