import React, { useEffect, useState } from 'react'
import { MdNoteAdd } from "react-icons/md";
import AddNote from './AddNote';
import axios from 'axios';
import { toast,Toaster } from 'react-hot-toast';
import {format} from 'date-fns'

function Home() {
    const [openModal,setOpenModal]=useState(false)
    const [openEditModal,setEditOpenModal]=useState(false)
    const [noteData,SetNoteData]=useState([])
    const [editNoteData,SetEditNoteData]=useState()
    const fetchData=async()=>{
    console.log("function called succesfully")
         const res=await axios.get('http://localhost:3000/api/getNote')
      console.log('response',res)
      SetNoteData(res.data)
        }
    useEffect(()=>{
        fetchData()
    },[])
    const handleUpdateNote = async (id) => {
        console.log(id);
        try {
            const response = await axios.get(`http://localhost:3000/api/oneNote/${id}`);
            console.log(response.data);
            SetEditNoteData(response.data)
            setEditOpenModal(true)
        } catch (error) {
            console.error("There was an error fetching the note:", error);
        }
    };
    const handleEditOnChange = async(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        SetEditNoteData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const handleEditNote=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.patch(`http://localhost:3000/api/updateNote/${editNoteData._id}`, editNoteData);
            console.log("response", res);
            closeModal();
            fetchData(); 
            toast.success("Note Updated successfully!");
        } catch (error) {
            console.error("There was an error updating the note:", error);
        }
    };
       
    
    const closeModal=()=>{
        setEditOpenModal(false)
    }

    const deleteNote=async(id)=>{
        console.log("dddddddddddddd",id)
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                const res = await axios.delete(`http://localhost:3000/api/deleteNote/${id}`);
                console.log(res);
                fetchData(); 
                toast.success("Note deleted successfully!");
            } catch (error) {
                console.error("There was an error deleting the note:", error);
            }
        }
    }
    const formatDate = (timestamp) => {
        return format(new Date(timestamp), 'MMMM dd, yyyy HH:mm:ss');
    }

  return (
    <div>
        <Toaster />
      <div className='bg-slate-300 h-16 w-full flex justify-between'>
        <div >
            <p className='py-3 pl-4 font-bold hover:text-primary text-2xl'>NoteApp</p>      
              </div>
        <button title='AddChat'
        className='text-primary py-2 pr-4'>
            <MdNoteAdd
            onClick={()=>setOpenModal(true)}
            size={34}/>
        </button>
      </div>
    
<div className='w-full h-full sm:grid grid-cols-3 lg-grid grid-cols-3 gap-3 p-3 '>
    { noteData?.map((item,index)=>(
       <div key={index} className="max-w-sm p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <a href="#">
           <h5 className="mb-2 text-2xl font-serif tracking-tight text-gray-900  dark:text-white ">{item?.title}</h5>
       </a>
       <p className="mb-3 font-normal text-gray-900 dark:text-gray-400">{item?.content}</p>
       <p className="text-sm text-gray-900">Created at: {formatDate(item.createdAt)}</p>
       <p className="text-sm text-gray-900">Updated at: {formatDate(item.updatedAt)}</p>
       <div className='flex justify-around'>
       <button 
       onClick={()=>handleUpdateNote(item._id)}
       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           Edit
           <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
           </svg>
       </button>
       <button 
       onClick={()=>deleteNote(item._id)}
       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           Delete
           <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
           </svg>
       </button>

       
       </div>
       
   </div>
    ))
}
{ 
    openModal && (
        <AddNote closeModal={() => setOpenModal(false)}  fetchData={fetchData} />
    )
}
{ openEditModal && (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 flex justify-center items-center'>
    <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
      <h2 className='font-semibold'>Add Your Note</h2>
      <form>
        <div className='flex flex-col gap-1'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter Your Title'
            onChange={handleEditOnChange}
            value={editNoteData.title}
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            name='content'
            placeholder='Enter Your Content'
            onChange={handleEditOnChange}
            value={editNoteData.content}
            className='bg-slate-100 px-2 py-1 focus:outline-primary h-32'
            required
          />
        </div>
        <div className='flex justify-evenly'>
        <button  
        onClick={handleEditNote}
        type="submit" className='bg-primary text-white px-4 py-2 mt-4 rounded'>
          Add Note
        </button>
        <button type="button" className='bg-secondary text-white px-4 py-2 mt-4 rounded' onClick={closeModal}>
          Close
        </button>
        </div>
      </form>
    </div>
  </div>
)
}
</div>
 </div>
  )
}

export default Home
