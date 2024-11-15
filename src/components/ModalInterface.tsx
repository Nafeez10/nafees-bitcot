import { PropsWithChildren } from "react";

type propsType = PropsWithChildren & {
    clickFunction: (e:any)=>void;
}

// This the modal wrapper component.
const ModalInterface = ({children, clickFunction}:propsType) =>{  

    return(
        <>
            {/* The click function below is the function we passed this component
                to close the particular modal. */}
            <section onClick={clickFunction} className=" flex items-center justify-center w-full h-screen absolute bg-[#00000087] ">
                <div className=" bg-white max-sm:w-full w-[450px] m-5 rounded-md ">
                    {
                        children
                    }
                </div>
            </section>
        </>
    )
}

export default ModalInterface;