'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from 'next-auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal } from '../conversations/conversation-id/modal';
import { Input } from '../inputs/input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { Button } from '../button';
import { useSession } from 'next-auth/react';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser?: User;
}

export const SettingsModal = ({ isOpen, currentUser, onClose }: SettingsModalProps) => {
  const { update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        update();
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information.</p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input id="name" label="Name" disabled={isLoading} errors={errors} register={register} required />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={image || currentUser?.image || '/images/avatar_placeholder.svg'}
                    alt="Avatar"
                  />
                  <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="zublzj4l">
                    <Button type="button" secondary disabled={isLoading}>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button onClick={onClose} secondary disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
