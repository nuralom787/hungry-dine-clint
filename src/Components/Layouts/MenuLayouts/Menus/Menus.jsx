import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useMenu from "../../../../Hooks/useMenu";
import banner from '../../../../assets/menu/banner3.jpg';
import dessert from '../../../../assets/menu/dessert-bg.jpeg';
import pizza from '../../../../assets/menu/pizza-bg.jpg';
import salad from '../../../../assets/menu/salad-bg.jpg';
import soup from '../../../../assets/menu/soup-bg.jpg';
import Cover from "../../SharedLayout/Cover/Cover";
import Menu from "../Menu/Menu";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";

const Menus = () => {
    const [menus] = useMenu();


    return (
        <section>
            <Helmet>
                <title>Hungry Dine | Menu</title>
            </Helmet>
            <section className="space-y-20">
                <Cover bgImage={banner} title={'our menu'} subtitle={'would you like to try a dish?'} />
                <SectionTitle heading={"TODAY'S OFFER"} subHeading={"---Don't miss---"} />
                <Menu menus={menus.filter(mn => mn.category === 'offered')} />
                <Cover bgImage={dessert} title={'desserts'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500.'} />
                <Menu menus={menus.filter(mn => mn.category === 'dessert')} />
                <Cover bgImage={pizza} title={'pizza'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500.'} />
                <Menu menus={menus.filter(mn => mn.category === 'pizza')} />
                <Cover bgImage={salad} title={'salad'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500.'} />
                <Menu menus={menus.filter(mn => mn.category === 'salad')} />
                <Cover bgImage={soup} title={'soups'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500.'} />
                <Menu menus={menus.filter(mn => mn.category === 'soup')} />
            </section>
        </section>
    );
};

export default Menus;