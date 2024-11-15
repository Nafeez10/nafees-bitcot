import { useContext, useEffect, useState } from "react"
import ContactsView from "./components/ContactsView"
import useFetchData from "./hooks/useFetchData";
import NavBar from "./components/NavBar";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";
import { AppContext } from "./context/AppProvider";
import ContactDetailsModal from "./components/ContactDetailsModal";

export type dataType = {
    id: number;
    name: string;
    mobile: string;
    email: string;
    address: string
}

function App() {

    const [ searchContact, setSearchContact ] = useState<string>('');
    const [ contacts, setContacts ] = useState<dataType[]>([]);
    const [ displayContacts, setDisplayContacts ] = useState<dataType[]>(contacts);
    
    const { data, isLoading, isError } = useFetchData(import.meta.env.VITE_API_KEY);

    const { showEditModal, setShowEditModal, showContactDetailModal, showAddContact, setShowAddContact } = useContext(AppContext);
    
    
    useEffect(()=>{
        if(!isLoading && !isError){
            const temp = data.map( contact => ({...contact, address:""}));

            setContacts(temp);
            setDisplayContacts(temp);
        }
    },[data])   


    const addContactHandeler = (name:string, mobile:string, email:string, address:string) =>{
        const newContact = {
            id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
            name,
            mobile,
            email,
            address
        }

        setContacts([
            ...contacts, newContact
        ])

        const isNewPresent = name.toLowerCase().includes(searchContact) || mobile.includes(searchContact);

        if(isNewPresent){
            setDisplayContacts([
                ...displayContacts, newContact
            ])
        }

    }

    const editContactHandeler = ( id:number, name:string, mobile: string, email:string, address:string) =>{
        
        const temp = contacts.map( contact => {
            if(contact.id == id){
                return {
                    id,
                    name,
                    mobile,
                    email,
                    address
                }
            }
            return contact
        });

        const tempDisplay = contacts.map( contact => {
            if(contact.id == id){
                return {
                    id,
                    name,
                    mobile,
                    email,
                    address
                }
            }
            return contact
        });
        

        setContacts(temp);
        setDisplayContacts(tempDisplay);


    }

    return (
        <>
            {showAddContact && <AddContactModal addContactHandeler={addContactHandeler} setShowAddContact={setShowAddContact} />}
            {showEditModal
                && <EditContactModal
                        setShowEditModal={setShowEditModal}
                        editContactHandeler={editContactHandeler}
                    />
            }
            {showContactDetailModal && <ContactDetailsModal />}
            
            <main className=" p-2 w-[550px] max-sm:w-full h-screen mx-auto bg-black">
                <header className="">
                    <NavBar
                        setShowAddContact={setShowAddContact}
                    />
                </header>
                <section className="">
                    <ContactsView
                        searchContact={searchContact}
                        setSearchContact={setSearchContact}
                        contacts={contacts}
                        setContacts={setContacts}
                        displayContacts={displayContacts}
                        setDisplayContacts={setDisplayContacts}
                    />
                </section>
            </main>
        </>
    )
}

export default App
