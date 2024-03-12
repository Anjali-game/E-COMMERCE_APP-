import React, {  useRef,  } from 'react'
import HomeCard from '../component/HomeCard';
import { GrPrevious, GrNext } from "react-icons/gr";
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
//import FilterProduct from '../component/FilterProduct';
import Allproduct from '../component/Allproduct';
const Home = () => {

  const productData = useSelector((state)=> state.product.productList)
  
  const homeProductCartList = productData.slice(1, 5)
  const homeProductCartListVegetables = productData.filter(el =>   el.category === "vegetables",[] )
  

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

      const slideProductRef = useRef()

  const nextProduct= () => {
    slideProductRef.current.scrollLeft += 200
  }
  const preveProduct =() => {
    slideProductRef.current.scrollLeft -= 200

  }
  const categoryList = [...new Set (productData.map(el => el.category))]
  console.log(categoryList)


  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2 '>
        <div className='flex gap-3 bg-emerald-500 w-36 px-2 items-center rounded-full '>
          <p className='text-sm font-bold text-slate-200'>Bike Delivery</p>
          <img src= "https://cdn.iconscout.com/icon/premium/png-256-thumb/heavy-bike-1978235-1667773.png" className='h-7' alt = ""/>
        </div>
        
        <h2 className='text-4xl md:text-7xl text-violet-700 py-4 font-bold'>The Fastest Delivery in <span className='text-teal-800 '> Your Home </span></h2>
        <p className='py-3 text-base max-w-lg'>Food delivery is a courier service in which a restaurant, store, or independent food-delivery company delivers food to a customer. An order is typically made either through a restaurant or grocer's website or mobile app, or through a food ordering company. The delivered items can include entrees, sides, drinks, desserts, 
        or grocery items and are typically delivered in boxes or bags. The delivery person will normally drive a car, but in bigger cities where homes and restaurants are closer together, they may use bikes or motorized scooters.</p>
        <button className='font-bold bg-red-500 px-4 py-2 text-slate-200 rounded-md '>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-6 my-4 p-4 justify-center'>
          {
            homeProductCartList[1]  ?
             homeProductCartList.map(el => {
              return(
                <HomeCard
                key={el._id}
                image ={el.image}
                id={el._id}
                  name={el.name}
                  price={el.price}
              category= {el.category}
                />
              )
            })
            :
            loadingArray.map((el, index)=> {
              return(
                <HomeCard
                key={index+"loading"}
                loading={"Loading..."}
                />
                

              )
            } )
          }
        
          
          
          
        </div>
      </div>
      <div className=''>
       <div className='flex w-full items-center'>
       <h2 className='font-bold  text-2xl text-slate-800  mb-4'>Fresh Vegetables</h2>
       </div>
       <div className='ml-auto  flex gap-4'>
        <button onClick={preveProduct}className='bg-slate-300 hover:bg-slate-400 rounded p-1 text-lg'> <GrPrevious /></button>
        <button onClick={nextProduct}className='bg-slate-300 hover:bg-slate-400 rounded p-1 text-lg'> <GrNext /></button>

       </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none ' ref={slideProductRef}>
          {
            homeProductCartListVegetables[0]  ? homeProductCartListVegetables.map(el => {
              return(
                <CardFeature
                key={el._id+"vegetables"}
                  image ={el.image}
                  id={el._id}
                  name={el.name}
                  price={el.price}
                  category= {el.category}/>
              )
            })
            :
            loadingArrayFeature.map((el, index) => 
            (<CardFeature  loading ="Loading..."  key={index+"cartLoading"}/>))
          } 
        
      
        </div>
      </div>

      
      <Allproduct heading={"Your Product"}/>
    </div>
  )
}

export default Home