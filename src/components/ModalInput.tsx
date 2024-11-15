import { ChangeEvent } from "react";

type propsType = {
    labelName: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    inputType?: string;
}

const ModalInput = ({ labelName, inputValue, setInputValue, inputType = "text" }:propsType) =>{

    const setInputHandeler = (e:ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

    return(
        <>
            <div className=" w-[60%]">
                <label className=" block" htmlFor="name">
                    {labelName}:
                </label>
                <input
                    required={true}
                    value={inputValue}
                    onChange={setInputHandeler}
                    className=" w-full border-2 border-black rounded-md px-2 py-1"
                    placeholder={`Enter Your ${labelName}`}
                    type={inputType}
                    id="name" 
                />
            </div>
        </>
    )
}

export default ModalInput;