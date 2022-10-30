import React, { Component } from 'react';
import { Layout } from '../components';
import {FermentorData} from "../components"
const Fermentors = () =>{
return(
    <Layout>
        <>
         <div className='px-20 h-screen pt-20'>
        <div className='h-[70%] w-full bg-gray-300'>
Grapph
        </div>
        <div className='h-[20%] w-full bg-blue-300'>
Fermentors
        </div>
    </div>
        </>
   
    </Layout>
)   
}

export default Fermentors;