import { useContext, useState } from "react";
import ModalInterface from "./ModalInterface";
import { wrongSvg } from "../assets";
import ModalInput from "./ModalInput";
import { AppContext } from "../context/AppProvider";

type propsType = {
    setShowEditModal:  React.Dispatch<React.SetStateAction<boolean>>;
    editContactHandeler: ( currentEditId:number, name: string, mobile: string, email: string, address:string ) => void;
}

const EditContactModal = ({ setShowEditModal, editContactHandeler}:propsType) =>{

    const { currentContactEdit } = useContext(AppContext);

    const [ editContactName, setEditContactName ] = useState(currentContactEdit?.name!);
    const [ editContactEmail, setEditContactEmail ] = useState(currentContactEdit?.email!);
    const [ editContactMobile, setEditContactMobile ] = useState(currentContactEdit?.mobile!);
    const [ editContactAddress, setEditContactAddress ] = useState(currentContactEdit?.address!);

    const editContactModalHandeler = () => setShowEditModal(false);

    const closeModalhandeler = (e:MouseEvent) =>{
        if(e.target == e.currentTarget){
            setShowEditModal(false);
        }
    }

    const resetHandeler = () =>{
        setEditContactName('')
        setEditContactEmail('')
        setEditContactMobile('')
        setEditContactAddress('')
    }

    const isFormFilled = Boolean(editContactName && editContactEmail && editContactMobile);

    const submitBtnHandeler = (e:any) =>{
        e.preventDefault()
        if(!isFormFilled){
            return
        }
        editContactHandeler(currentContactEdit?.id!, editContactName, editContactMobile, editContactEmail, editContactAddress);
        resetHandeler();
        setShowEditModal(false)
    }

    return(
        <>
            <ModalInterface clickFunction={closeModalhandeler}>
            <>
                    <div className=" flex items-center p-4 justify-between border-b-2">
                        <h2 className=" text-lg">
                            Add Contact
                        </h2>
                        <button onClick={editContactModalHandeler}>
                            <img className=" w-7" src={wrongSvg} alt="" />
                        </button>
                    </div>
                    <form onSubmit={(e)=>e.preventDefault()} className=" flex flex-col gap-2.5 items-center mt-5 pb-8" action="">
                        <ModalInput
                            labelName="Name"
                            inputValue={editContactName}
                            setInputValue={setEditContactName}
                        />
                        <ModalInput
                            labelName="Email"
                            inputValue={editContactEmail}
                            setInputValue={setEditContactEmail}
                            inputType="email"
                        />
                        <ModalInput
                            labelName="Phone Number"
                            inputValue={editContactMobile}
                            setInputValue={setEditContactMobile}
                        />
                        <ModalInput
                            labelName="Address"
                            inputValue={editContactAddress}
                            setInputValue={setEditContactAddress}
                        />
                        <div className=" flex gap-5 mt-5">
                            <button disabled={!isFormFilled} onClick={submitBtnHandeler} className=" disabled:bg-red-500 active:scale-90 transition bg-blue-500 text-white px-4 py-2 rounded-md">
                                Submit
                            </button>
                            <button onClick={resetHandeler} className="bg-neutral-800 active:scale-90 transition text-white px-4 py-2 rounded-md">
                                Reset
                            </button>
                        </div>
                        
                    </form>
                </>
            </ModalInterface>
        </>
    )
}

export default EditContactModal;