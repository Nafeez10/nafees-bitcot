import { useContext, useEffect, useState } from "react"
import ContactsView from "./components/ContactsView"
import useFetchData from "./hooks/useFetchData";
import NavBar from "./components/NavBar";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";
import { AppContext } from "./context/AppProvider";
import ContactDetailsModal from "./components/ContactDetailsModal";

// This is the data that comes from the api but the address property is added locally 
// because we use address property in this app and api doesn't provide the property so
// i added it locally.
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
            // This is to transform the api's data by adding the address property in it.
            const temp = data.map( contact => ({...contact, address:""}));

            setContacts(temp);
            setDisplayContacts(temp);
        }
    },[data])   

    console.log(displayContacts)

    // This function runs the code to add a new contact.
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

    // This function runs the code to edit the existing contact.
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

    const loadingElement = (
        <p className="text-center text-white mt-10">Loading...</p>
    )

    const errorElement = (
        <p className="text-center text-white mt-10">Something went wrong!</p>
    )

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
            
            <main className=" flex flex-col p-2 w-[550px] max-sm:w-full h-screen mx-auto bg-black">
                <header className="">
                    <NavBar
                        setShowAddContact={setShowAddContact}
                    />
                </header>
                {isLoading ? loadingElement : <></>}
                {isError ? errorElement : <></>}
                <section className=" grow overflow-y-auto">
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
