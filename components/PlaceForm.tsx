'use client'
import React, { useState, useTransition } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Locale, i18n } from '@/i18n.config';
import Input from './Input';
import Textarea from './Textarea';
import { FiLoader } from "react-icons/fi";
import { IoMdCreate } from 'react-icons/io';
import { Button } from './ui/button';
import { Toaster, toast } from 'sonner';
import { createPlace } from '@/actions/actions';

const languageNames: Record<Locale, { [key in Locale]: string }> = {
  en: { en: 'English', tr: 'Turkish' },
  tr: { en: 'İngilizce', tr: 'Türkçe' },
};

export default function PlaceForm({
    lang,
    user,
  }: {
    lang: Locale;
    user: any;
  }) {
    const [isPending, startTransition] = useTransition();

    const [imageUrl, setImageUrl] = useState('')

    const [formData, setFormData] = useState<Record<Locale, { name: string; description: string }>>({
      en: { name: '', description: '' },
      tr: { name: '', description: '' },
    });

    const resetFormData = () => {
        setFormData({
          en: { name: '', description: '' },
          tr: { name: '', description: '' },
        });
      };

    const handleChange = (locale: Locale, field: 'name' | 'description', value: string) => {
        setFormData((formData) => ({
          ...formData,
          [locale]: {
            ...formData[locale],
            [field]: value,
          },
        }));
      };
  
    return (
      <>
        {i18n.locales.map((locale, index) => (
          <Accordion type="single" key={locale} collapsible className="w-full">
            <AccordionItem value={`item-${index}`} className="w-full">
              <AccordionTrigger>
                <p>{languageNames[lang][locale]}</p>
              </AccordionTrigger>
              <AccordionContent className="p-2 flex flex-col gap-2">
                <Input
                  required
                  name={`${lang}-name`}
                  type='text'
                  placeholder={`${languageNames[lang][locale]} Name`}
                  value={formData[locale].name}
                  onChange={(e) => handleChange(locale, 'name', e.target.value)}
                />
                <Textarea
                  required
                  name={`${lang}-description`}
                  placeholder={`${languageNames[lang][locale]} Description`}
                  value={formData[locale].description}
                  onChange={(e) => handleChange(locale, 'description', e.target.value)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        <Input
          required
          name="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          type='url'
          onChange={(e) => setImageUrl(e.target.value)} // Update imageUrl state
        />
        
          <Button
            className="uppercase w-full flex gap-2"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                try {
                  const response: any = await createPlace(formData, user, imageUrl);
  
                  if (response.success) {
                    toast.success('Place added.');
                    resetFormData();
                  } else {
                    toast.error(response.error);
                  }
                } catch (error: any) {
                  toast.error(error.message || 'Could not add place.');
                }
              });
            }}
          >
            <h1>Create</h1>
            {isPending ?
            <FiLoader className="animate-spin"/>
            :
            <IoMdCreate />
            }
          </Button>
          <Toaster closeButton/>
      </>
    );
  }