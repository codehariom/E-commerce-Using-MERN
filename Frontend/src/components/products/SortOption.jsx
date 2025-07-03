import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortOption() {

    const [searchParms ,setSearchParams] = useSearchParams()

    const handelSortChange = (e)=>{
        const sortby = e.target.value;
        searchParms.set("sort",sortby)
        setSearchParams(searchParms)
    }

  return (
    <div className=' mb-4 flex items-center justify-end'>
        <select name="sort" id="sort" onChange={handelSortChange}  className=' border p-1 mx-4 rounded-md focus:outline-0'>
            <option value="">Default</option> 
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDsc">Price: High to Low </option>
            <option value="popularity">Popularity </option>
        </select>
    </div>
  )
}

export default SortOption