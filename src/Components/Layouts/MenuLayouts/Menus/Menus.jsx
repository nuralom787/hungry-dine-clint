import { Helmet } from "react-helmet-async";
import banner from '../../../../assets/menu/banner3.jpg';
import Cover from "../../SharedLayout/Cover/Cover";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import useMenu from "../../../../Hooks/useMenu";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";

const Menus = () => {
    const [menus] = useMenu();


    return (
        <section>
            <Helmet>
                <title>Hungry Dine | Menu</title>
            </Helmet>
            <section className="space-y-16">
                <Cover bgImage={banner} title={'our menu'} subtitle={'would you like to try a dish?'} />
                <SectionTitle heading={"TODAY'S OFFER"} subHeading={"---Don't miss---"} />
                <Menu menus={menus.filter(mn => mn.category === 'offered')} />
                <Cover bgImage={banner} title={'desserts'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                <Menu menus={menus.filter(mn => mn.category === 'dessert')} />
                <Cover bgImage={banner} title={'pizza'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                <Menu menus={menus.filter(mn => mn.category === 'pizza')} />
                <Cover bgImage={banner} title={'salad'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                <Menu menus={menus.filter(mn => mn.category === 'salad')} />
                <Cover bgImage={banner} title={'soups'} subtitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                <Menu menus={menus.filter(mn => mn.category === 'soup')} />
            </section>
        </section>
    );
};

export default Menus;