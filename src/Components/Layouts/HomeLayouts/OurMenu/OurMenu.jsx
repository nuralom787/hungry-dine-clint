import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";
import MenuItem from "../../SharedLayout/MenuItem/MenuItem";
import useMenu from "../../../../Hooks/useMenu";

const OurMenu = () => {
    const [menus] = useMenu();
    const filterData = menus.filter(dt => dt.category === 'popular');


    return (
        <section className="max-w-5xl mx-auto px-2">
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check It Out---'} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    filterData.map(item => <MenuItem
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