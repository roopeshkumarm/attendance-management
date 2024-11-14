"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

function AddNewStudent() {
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const {
    register,  // use lowercase 'register'
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data", data);
    reset();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+Add New Student</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'></div>

                <div className='py-3'>
                  <label className=''>Name</label>
                  <Input
                    {...register('name', { required: true })}
                    placeholder='Ex.Roopesh'
                  />
                </div>
                <div className='py-3'>
                  <label className=''>Year</label>
                  <Input type='number'
                    {...register('year', { required: true })}
                    placeholder='Ex.3'
                  />
                </div>
                <div className='py-3'>
                  <label className=''>Department</label>
                  <Input 
                    {...register('dept', { required: true })}
                    placeholder='Ex.CSE'
                  />
                </div>
                <div className='flex g-3 justify-end items-end m-5'>
                  <Button type="button"
                  onClick={() => setOpen(false)} variant="ghost" className='p-2 mr-2' >Cancel</Button>
                  <Button type="submit">Save</Button>
                  {/* <Button type="submit" disable={loading}>{loading ? <LoaderIcon className='animate-spin'/> : 'Save'}</Button> */}
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
