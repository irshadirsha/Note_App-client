import React, { useState } from 'react';
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
function AddNote({ closeModal, fetchData}) {
    const [note,setNote]=useState({
        title:"",
        content:""
    })
    
    const handleOnChange = async(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setNote((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const handleSubitNote=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post('http://localhost:3000/api/addNote',note)
            console.log("respons",res)
            closeModal()
            fetchData()
            toast.success("Note Created successfully!");

        } catch (error) {
            console.log(error)
        }
        console.log(note)
    }
    console.log("note",note)

  return (
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
              onChange={handleOnChange}
              value={note.title}
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
              onChange={handleOnChange}
              value={note.content}
              className='bg-slate-100 px-2 py-1 focus:outline-primary h-32'
              required
            />
          </div>
          <div className='flex justify-evenly'>
          <button  
          onClick={handleSubitNote}
          type="submit" className='bg-primary text-white px-4 py-2 mt-4 rounded'>
            Add Note
          </button>
          <button type="button" className='bg-secondary text-white px-4 py-2 mt-4 rounded' onClick={closeModal}>
            Close
          </button>
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  );
}

export default AddNote;
