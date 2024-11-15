import { useEffect, useState } from "react";
import { dataType } from "../App";



const useFetchData = (url:string) =>{

    const [ data, setData ] = useState<dataType[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    useEffect(()=>{

        const fetchData = async()=>{
            setIsLoading(true);
            try{
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            }catch{
                setIsError(true);
            }finally{
                setIsLoading(false);
            }
        }

        fetchData();

    },[url]);
    
    return {
        data,
        isLoading,
        isError
    }

}

export default useFetchData;