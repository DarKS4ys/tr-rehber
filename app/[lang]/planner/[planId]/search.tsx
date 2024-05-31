'use client';

import { AiOutlineSearch } from 'react-icons/ai';
import { ClientMessage } from '@/actions/ai';
import { nanoid } from 'ai';
import { useActions, useUIState } from 'ai/rsc';
import React, { useEffect, useState, useTransition } from 'react';
import { MdSend } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n.config';

export default function Search({ planId, lang, predefinedInput }: { planId: string, lang:Locale, predefinedInput?: string | null }) {
  const [input, setInput] = useState(predefinedInput && decodeURI(predefinedInput) || '');
  const [isPending, startTransition] = useTransition();
  const [placeholder, setPlaceholder] = useState('');
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();


  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    const placeholders = [
      'Keşfetmek için bir yer öner',
      'Doğa harikası bir yer öner',
      'Tarihi bir mekan öner',
      'Yemek için güzel bir yer öner',
      'Macera dolu bir yer öner',
      'Rahatlayabileceğim bir yer öner',
      'Ailece gidebileceğimiz bir yer öner',
      'Kültürel bir deneyim öner',
    ];
    const randomPlaceholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  const groupMessages = (messages: ClientMessage[]) => {
    const groupedMessages: [ClientMessage, ClientMessage?][] = [];
    for (let i = 0; i < messages.length; i += 2) {
      if (i + 1 < messages.length) {
        groupedMessages.push([messages[i], messages[i + 1]]);
      } else {
        groupedMessages.push([messages[i]]);
      }
    }
    return groupedMessages;
  };

  const groupedMessages = groupMessages(conversation);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput('');
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: 'user', display: input },
    ]);

    startTransition(async () => {
      const message = await continueConversation(input, planId, lang);
      api?.scrollTo(conversation.length + 1);

      setConversation((currentConversation: ClientMessage[]) => [
        ...currentConversation,
        message,
      ]);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-4 w-full items-center">
        <AiOutlineSearch size={28} />
        <form
          className="h-full w-full flex gap-x-4"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            disabled={isPending}
            placeholder={placeholder}
            className="border-b bg-transparent focus:border-primary transition w-full h-full outline-none"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />

          <Button disabled={isPending} type="submit" className="mr-4" size="icon">
            <MdSend size={20} />
          </Button>
        </form>
      </div>
      {conversation && conversation.length > 0 && (
        <div>
          <Carousel setApi={setApi} className="w-full max-w-lg mx-auto pt-2">
            <CarouselContent>
              {groupedMessages.map((pair, i) => (
                <CarouselItem key={i}>
                  <div className={cn(isPending && 'opacity-50')}>
                    <div>
                      <strong>{pair[0].role}:</strong> {pair[0].display}
                    </div>
                    {pair[1] && (
                      <div className="flex flex-col gap-y-1">
                        <strong>{pair[1].role}:</strong> {pair[1].display}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
}
