import { Parallax } from 'react-parallax';

const Cover = ({ bgImage, title, subtitle }) => {

    return (
        <div>
            <Parallax blur={0} bgImage={bgImage} bgImageSizes={700} strength={500}>
                <div className="hero h-[500px] md:h-[700px]">
                    <div className="hero-overlay w-5/6 md:w-4/6 h-3/6 bg-opacity-60"></div>
                    <div className="text-white text-center w-4/6 md:w-3/6 mx-auto">
                        <h1 className="uppercase mb-5 text-4xl md:text-7xl font-bold font-Cinzel">{title}</h1>
                        <p className="uppercase mb-5 font-Cinzel font-semibold text-base md:text-xl">{subtitle}</p>
                    </div>
                </div>
            </Parallax>

        </div>
    );
};

export default Cover;