import ModalInterface from "./ModalInterface"
import { useState } from "react";
import { wrongSvg } from "../assets";
import ModalInput from "./ModalInput";

type propsType = {
    setShowAddContact: React.Dispatch<React.SetStateAction<boolean>>;
    addContactHandeler :(name: string, mobile: string, email: string, address:string) => void;
}

const AddContactModal = ({ setShowAddContact, addContactHandeler }:propsType) =>{

    const [ contactName, setContactName ] = useState('');
    const [ contactEmail, setContactEmail ] = useState('');
    const [ contactMobile, setContactMobile ] = useState('');
    const [ contactAddress, setContactAddress ] = useState('');

    const addContactModalHandeler = () => setShowAddContact(false);

    const closeModalhandeler = (e:MouseEvent) =>{
        if(e.target == e.currentTarget){
            setShowAddContact(false);
        }
    }

    const isFormFilled = Boolean(contactName && contactEmail && contactMobile && contactAddress);


    const resetHandeler = () =>{
        setContactName('')
        setContactEmail('')
        setContactMobile('')
        setContactAddress('')
    }
    
    const submitBtnHandeler = (e:any) =>{
        e.preventDefault()

        if(!isFormFilled){
            return;
        }

        addContactHandeler(contactName, contactMobile, contactEmail, contactAddress);
        resetHandeler();
        setShowAddContact(false)
    }

    return(
        <>
            <ModalInterface clickFunction={closeModalhandeler}>
                <>
                    <div className=" flex items-center p-4 justify-between border-b-2">
                        <h2 className=" text-lg">
                            Add Contact
                        </h2>
                        <button onClick={addContactModalHandeler}>
                            <img className=" w-7" src={wrongSvg} alt="" />
                        </button>
                    </div>
                    <form onSubmit={(e)=>e.preventDefault()} className=" flex flex-col gap-2.5 items-center mt-5 pb-8" action="">
                        <ModalInput
                            labelName="Name"
                            inputValue={contactName}
                            setInputValue={setContactName}
                        />
                        <ModalInput
                            labelName="Email"
                            inputValue={contactEmail}
                            setInputValue={setContactEmail}
                        />
                        <ModalInput
                            labelName="Phone Number"
                            inputValue={contactMobile}
                            setInputValue={setContactMobile}
                            inputType="tel"
                        />
                        <ModalInput
                            labelName="Address"
                            inputValue={contactAddress}
                            setInputValue={setContactAddress}
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

export default AddContactModal;