"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

function AddNewStudent({ onAddStudent }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    onAddStudent(data);
    setLoading(false);
    reset();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-3'>
                  <label className=''>Name</label>
                  <Input
                    {...register('name', { required: true })}
                    placeholder='Ex. Roopesh'
                  />
                </div>
                <div className='py-3'>
                  <label className=''>Year</label>
                  <Input
                    type='number'
                    {...register('year', { required: true })}
                    placeholder='Ex. 3'
                  />
                </div>
                <div className='py-3'>
                  <label className=''>Department</label>
                  <Input
                    {...register('department', { required: true })}
                    placeholder='Ex. CSE'
                  />
                </div>
                <div className='flex gap-3 justify-end items-end mt-5'>
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost" className='p-2'>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
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
