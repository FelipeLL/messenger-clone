'use client';

import Image from 'next/image';
import { Modal } from './modal';

interface ImageModalProps {
  isOpen?: boolean;
  src?: string | null;
  onClose: () => void;
}

export const ImageModal = ({ isOpen, src, onClose }: ImageModalProps) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src} alt="Image" fill className="object-contain" />
      </div>
    </Modal>
  );
};
