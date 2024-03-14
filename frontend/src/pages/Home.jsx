import React, { useEffect, useState } from 'react'
import axios from "axios"

const Home = () => {
  const [books, setBooks] = useState();
  const [loading, setloading] = useState(false);
  const fetchBook = async () => {
    try {
      setloading(true);
      const resp = await axios.get("http://localhost:3000/book/4");
      console.log(resp.data);
      setBooks(resp.data.data)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }
  useEffect(() => {
    fetchBook();
  }, [])
  return (
    <>
      <div className="">
        <div className="">
          <h2>Book Store</h2>

        </div>
        {/* {
      loading ? <h3>Loading...</h3> : {
      
      }
    } */}
      </div>
    </>
  )
}

export default Home