
const Menu = ({ menus }) => {
    return (
        <div className="max-w-5xl mx-auto px-2 space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    menus.map(item => <div key={item._id} className="flex justify-between gap-6">
                        <img className="w-28 h-24 rounded-es-full rounded-e-full" src={item.image} alt="" />
                        <div className="text-start space-y-2">
                            <h1 className="uppercase font-normal text-xl text-[#151515] dark:text-white font-Cinzel">{item.name} -----</h1>
                            <p className="text-base text-[#737373] dark:text-white font-Inter">{item.recipe}</p>
                        </div>
                        <p className="font-Inter font-normal text-xl text-[#BB8506]">${item.price}</p>
                    </div>)
                }
            </div>
            <button className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#151515] dark:text-white hover:text-white px-6 py-2 rounded-lg border-b-2 border-[#1F2937] dark:border-white dark:hover:border-[#1F2937] hover:border-b-2 hover:border-[#1F2937] hover:bg-[#1F2937] duration-300">ORDER YOUR FAVORITE FOOD</button>
        </div>
    );
};

export default Menu;