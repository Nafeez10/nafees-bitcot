import { ChangeEvent, useEffect } from "react";
import UserContact from "./UserContact";
import { dataType } from "../App";

type propsType = {
    searchContact: string,
    setSearchContact: React.Dispatch<React.SetStateAction<string>>; 
    contacts: dataType[];
    setContacts: React.Dispatch<React.SetStateAction<dataType[]>>;
    displayContacts: dataType[];
    setDisplayContacts: React.Dispatch<React.SetStateAction<dataType[]>>;
}

const ContactsView = ({ contacts, setContacts, displayContacts, setDisplayContacts, searchContact, setSearchContact }:propsType) =>{

    // This useEffect function filters the data and update the data according to the
    // user's input.
    useEffect(()=>{
        const temp = contacts.filter( contact =>
            contact.name.toLowerCase().includes(searchContact)
            ||
            contact.mobile.includes(searchContact)
        );
        setDisplayContacts(temp);

    },[searchContact])

    // This function is to delete a contact
    const deleteContactHandeler = (id:number) =>{
        const temp = contacts.filter( contact => contact.id !== id);
        setContacts(temp);

        const tempDisplay = displayContacts.filter( contact => contact.id !== id);
        setDisplayContacts(tempDisplay);
    }

    const searchContacthandeler = (e:ChangeEvent<HTMLInputElement>) => setSearchContact(e.target.value)

    return(
        <>
            <div className=" w-full mt-5">
                <div className=" w-full flex justify-center ">
                    <input 
                        className=" text-lg rounded-sm px-4 py-1"
                        value={searchContact}
                        onChange={searchContacthandeler}
                        type="text"
                        placeholder="Search Contact"
                    />
                </div>  
                <div className="mt-5 p-2 flex flex-col gap-3">
                    {
                        displayContacts.map( contact =>(
                            <UserContact
                                key={contact.id}
                                id={contact.id}
                                name={contact.name}
                                email={contact.email}
                                mobile={contact.mobile}
                                address={contact.address}
                                deleteContactHandeler={deleteContactHandeler}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ContactsView;