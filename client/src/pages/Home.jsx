import React, {useState , useEffect} from 'react';
import {Card, FormField, Loader} from "../component";
//import { set } from 'mongoose';

const RenderCards = ({data, title}) => {
    if(data?.length > 0){
        return data.map((post) => <Card key={post._id} {...post} />)
    }

    return(
        <h2 className="mt-5 font-bold text-[#a865b5] text-xl uppercase">{title}</h2>
    )
}

const Home = () => {
  const [loading, setloading] = useState(false);
  const [allpost, setallpost] = useState(null);
  const[searchText, setsearchText] = useState('');
  const[searchedResults,setSearchedResults] = useState(null);
  const[searchTimeout, setSearchTimeout] = useState(null);

  useEffect( () => {
    const fetchPosts = async () => {
        setloading(true);
      try{
        const response = await fetch('https://artbot-ittj.onrender.com/api/v1/post' , {
          method: 'GET',
          headers : {
            'Content-Type' : 'application/json' ,
          },
        })

        if(response.ok) {
          const result = await response.json();

          setallpost(result.data.reverse()); //reverse so that newly generated image comes on top
        }
      } catch(error) {
        alert(error)
      } finally {
        setloading(false)
      }

    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); //clears timeout everytime we type something new

    setsearchText(e.target.value);

    setSearchTimeout(
    setTimeout(() => {
      const searchResults = allpost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())||
      item.prompt.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchedResults(searchResults);
    }, 500));  //if you type multiple characters within 500 milli seconds, then all that will be considered as a single request
  }

  return (
    <section>
      <div className="text-center" >
        <h1 className="font-bold text-[#c5c6d0] text-[72px] font-serif flex-center">My Creative Gallery</h1>
        <p className="mt-2 text-[#9897a9] text-[20px] max-w[500px]">Explore the collection of creative and stunning visuals crafted by me!</p>

      </div>


      <div className="mt-16">
        <FormField 
          LabelName = "Search Posts"
          type = "text"
          name = "text"
          placeholder= "Search Posts"
          value = {searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center">
            <Loader/>
          </div>
        ):(
          <>
          {searchText && (
            <h2 className='font-medium text-[#9897a9] text-xl mb-3'>
                Showing results for <span className="text-[#c5c6d0]">{searchText}</span>
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 text-[#9897a9]">
            {
                searchText ? (
                    <RenderCards data ={searchedResults} title= "No results found" />
                ):(
                    <RenderCards data={allpost} title ="No Posts found" />
                )
            }

          </div>
          </>
        )}

      </div>

    </section>
  )
}

export default Home;
