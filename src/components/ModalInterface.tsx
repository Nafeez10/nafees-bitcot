import { PropsWithChildren } from "react";

type propsType = PropsWithChildren & {
    clickFunction: (e:any)=>void;
}

const ModalInterface = ({children, clickFunction}:propsType) =>{  

    return(
        <>
            <section onClick={clickFunction} className=" flex items-center justify-center w-full h-screen absolute bg-[#00000087] ">
                <div className=" bg-white max-sm:w-full m-5 rounded-md ">
                    {
                        children
                    }
                </div>
            </section>
        </>
    )
}

export default ModalInterface;