type propsType = {
    label: string;
    value: string
}

const UserPropertyDetail = ({label, value}:propsType) =>{

    return(
        <>
            <div className=" m-3 flex ">
                <h3 className=" w-[30%] text-end">
                    {label} :
                </h3>
                <p className=" ml-10">{value ? value : "No Data"}</p>
            </div>
        </>
    )
}

export default UserPropertyDetail;