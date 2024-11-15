import { useContext } from "react";
import ModalInterface from "./ModalInterface";
import { AppContext } from "../context/AppProvider";
import { wrongSvg } from "../assets";
import UserPropertyDetail from "./UserPropertyDetail";

const ContactDetailsModal = () =>{

    const { setShowContactDetailModal, currentShowUserDetail } = useContext(AppContext);

    // This function is to close the modal if the user clicks outside the form.
    const contactDetailModalHandeler = (e:MouseEvent) =>{

        if(e.target == e.currentTarget){
            setShowContactDetailModal(false);
        }
    }

    return(
        <>
            <ModalInterface clickFunction={contactDetailModalHandeler}>
                <>
                    <div className=" p-4 flex items-center justify-between border-b-2">
                        <h2 className=" text-lg">
                            Contact Details
                        </h2>
                        <button onClick={()=>setShowContactDetailModal(false)}>
                            <img className=" w-7" src={wrongSvg} alt="" />
                        </button>
                    </div>
                    <div className=" font-bold">
                        <div className=" bg-white m-3">
                            <UserPropertyDetail
                                label="Name"
                                value={currentShowUserDetail?.name!}
                            />
                            <UserPropertyDetail
                                label="Email"
                                value={currentShowUserDetail?.email!}
                            />
                            <UserPropertyDetail
                                label="Number"
                                value={currentShowUserDetail?.mobile!}
                            />
                            <UserPropertyDetail
                                label="Address"
                                value={currentShowUserDetail?.address!}
                            />
                        </div>
                        
                    </div>
                </>
            </ModalInterface>
        </>
    )
}

export default ContactDetailsModal;