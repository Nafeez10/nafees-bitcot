import { plusSvg } from "../assets";

type propsType = {
    setShowAddContact:  React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar = ({setShowAddContact}:propsType) =>{

    const showAddContactHandeler = () => setShowAddContact(true);

    return(
        <>
            <nav className=" flex justify-center items-center gap-2.5 bg-blue-300 py-3  rounded-lg">
                <h1 className="text-white text-xl tracking-wider">All Contacts</h1>
                <button onClick={showAddContactHandeler}>
                    <img className="w-7" src={plusSvg} alt="" />
                </button>
            </nav>
        </>
    )
}

export default NavBar;