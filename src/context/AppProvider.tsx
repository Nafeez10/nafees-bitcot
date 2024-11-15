import { createContext, ReactElement, useState } from "react";
import { dataType } from "../App";

type initContextType = {
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    showContactDetailModal: boolean;
    setShowContactDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentShowUserDetail: dataType | null;
    setCurrentShowUserDetail: React.Dispatch<React.SetStateAction<dataType | null>>;
    showAddContact: boolean;
    setShowAddContact: React.Dispatch<React.SetStateAction<boolean>>;
    currentContactEdit: dataType | null,
    setCurrentContactEdit: React.Dispatch<React.SetStateAction<dataType | null>>;
}

const initContetxt : initContextType = {
    showEditModal: false,
    setShowEditModal: ()=> {},
    showContactDetailModal: false,
    setShowContactDetailModal: ()=>{},
    currentShowUserDetail: null,
    setCurrentShowUserDetail: ()=>{},
    showAddContact: false,
    setShowAddContact: ()=>{},
    currentContactEdit: null,
    setCurrentContactEdit: ()=>{}
}

export const AppContext = createContext(initContetxt);

type propsType = {
    children: ReactElement
}

const AppProvider = ({children}:propsType) =>{

    const [ showEditModal, setShowEditModal ] = useState(false);
    const [ showContactDetailModal, setShowContactDetailModal ] = useState(false);
    const [ showAddContact, setShowAddContact ] = useState(false);
    const [ currentShowUserDetail, setCurrentShowUserDetail ] = useState<dataType | null>(null);
    const [ currentContactEdit, setCurrentContactEdit ] = useState<dataType | null>(null);

    return(
        <>
            <AppContext.Provider value={{
                showEditModal,
                setShowEditModal,
                showContactDetailModal,
                setShowContactDetailModal,
                currentShowUserDetail,
                setCurrentShowUserDetail,
                showAddContact,
                setShowAddContact,
                currentContactEdit,
                setCurrentContactEdit
            }}>
                {
                    children
                }
            </AppContext.Provider>
        </> 
    )
}

export default AppProvider;