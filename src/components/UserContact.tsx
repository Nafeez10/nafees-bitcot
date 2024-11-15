import { useContext } from "react";
import { dataType } from "../App";
import { contactSvg, deleteSvg, editSvg, eyeSvg } from "../assets";
import { AppContext } from "../context/AppProvider";

type propsType = dataType & {
    deleteContactHandeler:(id:number)=>void;
};

const UserContact = ({ id, name, mobile, email, address, deleteContactHandeler }:propsType) =>{

    const { setShowEditModal, setShowContactDetailModal, setCurrentShowUserDetail, setCurrentContactEdit } = useContext(AppContext);

    const editUserHandeler = () =>{
        setCurrentContactEdit({
            id,name,mobile,email,address
        })
        setShowEditModal(true);

        console.log('hi')
    }

    const showUserDetailHandeler = () =>{
        setCurrentShowUserDetail({
            id,name,mobile,email,address
        })

        setShowContactDetailModal(true);
    }

    return(
        <>
            <div className=" p-2 rounded-lg bg-white flex items-center justify-around">
                <div className=" pl-10">
                    <h2>
                        {id}
                    </h2>
                </div>
                <div className=" flex px-12 justify-between grow">
                    <div className=" flex items-center gap-4">
                        <div className=" w-8">
                            <img className="w-full" src={contactSvg} alt="" />
                        </div>
                        <div>
                            <h3 className=" text-sm ">
                                {name}
                            </h3>
                            <p className=" text-sm">
                                {mobile}
                            </p>
                        </div>
                    </div>
                    <div className=" flex items-center gap-3 ">
                        <button onClick={showUserDetailHandeler}>
                            <img className=" w-5" src={eyeSvg} alt="" />
                        </button>
                        <button onClick={()=>deleteContactHandeler(id)}>
                            <img className=" w-5" src={deleteSvg} alt="" />
                        </button>
                        <button onClick={editUserHandeler}>
                            <img className=" w-5" src={editSvg} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserContact;