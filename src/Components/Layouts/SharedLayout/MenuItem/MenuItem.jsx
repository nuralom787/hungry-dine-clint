const MenuItem = ({ item }) => {

    const { _id, name, recipe, image, category, price } = item;

    return (
        <div className="flex justify-between gap-6">
            <img className="w-28 h-24 rounded-es-full rounded-e-full" src={image} alt="" />
            <div className="text-start space-y-2">
                <h1 className="uppercase font-normal text-xl text-[#151515] dark:text-white font-Cinzel">{name} -----</h1>
                <p className="text-base text-[#737373] dark:text-white font-Inter">{recipe}</p>
            </div>
            <p className="font-Inter font-normal text-xl text-[#BB8506]">${price}</p>
        </div>
    );
};

export default MenuItem;