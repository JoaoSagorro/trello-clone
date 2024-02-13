'use client';

import { Plus } from "lucide-react";
import { useState, useRef, ElementRef } from "react";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {

  const formRef = useRef<ElementRef<'form'>>(null);

  const inputRef = useRef<ElementRef<'input'>>(null);

  const [ isEditing, setIsEditing ] = useState(false);


  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  }

  return(
    <ListWrapper>
        <button
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        >
          <Plus className="h-4 w-4 mr-2"/>
          Add a list
        </button>
    </ListWrapper>
  );
};
