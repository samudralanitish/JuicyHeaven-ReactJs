import { useEffect, useState } from "react"
import "./fetchingjuices.css"
const URL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
// const URL="https://restcountries.eu/rest/v2/all?s="
const FetchingJuices=()=>{
const[drinksData,setDrinksData]=useState([])
const[searchTerm, setSerchTerm]=useState("")
const[loading,setLoading]=useState(false)
const[isError,setIsError]=useState({staus:false,msg:""})


const fetchDrinks= async(apiUrl)=>{
    setLoading(true)
    setIsError({status:false,msg:""})
    try {
        const response= await fetch(apiUrl)
        const {drinks}=await response.json();
        setDrinksData(drinks)
        console.log(drinks);
        setLoading(false)
        setIsError({staus:false,msg:""})
        if(!drinks){
            throw new Error("data not found")
        }
    } catch (error) {
        setLoading(false)
        setIsError({staus:true,msg:error.message ||"Oops...! Something went wrong"})
    }
}
useEffect(()=>{
    const correctURL=`${URL}${searchTerm}`
    fetchDrinks(correctURL)
},[searchTerm])


    return <section>
        <form>
            <center>
                <br />
                <input type="text" name="search" id="search" placeholder="Enter drink name" value={searchTerm}
                onChange={(e)=>setSerchTerm(e.target.value)}/>
            </center>
        </form>
        <br />
        <hr/>
        {
            loading && !isError?.staus &&<h3 style={{color:"red"}}>...Loading</h3>
        }
        {
            isError?.staus && <h3  style={{color:"red"}}>{isError.msg}</h3>
        }
        {
            !loading && !isError?.staus && <ul className="box" >
            {
                drinksData.map((eachObj)=>{
                    const{strDrink,strDrinkThumb}=eachObj
                    return<li className="cocktail-data">
                        <div className="header">
                            <img src={strDrinkThumb} alt={strDrink} />
                        </div>
                        <div className="footer">
                            <center><h3>{strDrink}</h3></center>
                        </div>    
                    </li>
                })
            }
        </ul>
        }
    </section>
}
export default FetchingJuices