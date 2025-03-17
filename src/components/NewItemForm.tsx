
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewItemFormProps {
  onAdd: (text: string) => void;
  placeholder: string;
  buttonText: string;
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onAdd, placeholder, buttonText }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 animate-fade-in mb-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary/20"
      />
      <Button
        type="submit"
        disabled={!text.trim()}
        className="bg-primary/90 hover:bg-primary transition-colors"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default NewItemForm;
