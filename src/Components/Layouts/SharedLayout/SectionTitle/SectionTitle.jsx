const SectionTitle = ({ heading, subHeading, space }) => {

    return (
        <div className={space ? space : "my-12"}>
            <p className="italic text-base md:text-xl text-[#D99904] font-Inter">{subHeading}</p>
            <h1 className="w-fit mx-auto uppercase font-normal text-xl md:text-[40px] text-[#151515] dark:text-white font-Inter py-8 px-10 mt-5 border-y-2 border-[#151515] dark:border-white">{heading}</h1>
        </div>
    );
};

export default SectionTitle;