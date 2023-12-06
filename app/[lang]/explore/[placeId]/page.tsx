import Chat from '@/components/Chat';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import React from 'react';

export default async function page({
  params: { lang, placeId },
}: {
  params: { placeId: string; lang: Locale };
}) {
  const place = await prisma.place.findUnique({
    where: { id: placeId },
  });

  const sentences = (place?.info as { [key in Locale]: string })[lang].split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g
  );

  const firstText = sentences.slice(0, 8).join(' ');
  const remainingText = sentences.slice(8).join(' ');

  return (
    <div>
      {place?.imageUrl && (
        <div className="w-full relative h-96 flex items-center group">
          <div className="w-full h-full bg-black absolute top-0 left-0 z-10 opacity-40" />
          <Image
            src={place.imageUrl}
            fill
            className="object-cover"
            alt="Cover Image"
          />
          <div className="py-10 px-4 md:p-12 w-full">
            <div className="max-w-7xl mx-auto z-20 relative w-full text-white items-center flex">
              <div className="absolute left-0 -top-12 text-7xl font-semibold flex flex-col gap-4">
                <h1>{(place?.name as { [key in Locale]: string })[lang]}</h1>
                <h1 className="font-medium text-lg">
                  {(place?.description as { [key in Locale]: string })[lang]}
                </h1>
                {place?.tags && (
                  <div className="flex flex-wrap gap-2 text-sm">
                    {(place.tags as { [key: string]: string[] }[])
                      .find((tagObject) => tagObject[lang])
                      ?.[lang].map((tag, index) => (
                        <span
                          key={index}
                          className="shadow-lg bg-white/20 backdrop-blur px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-10 px-4 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h1>{firstText}</h1>
            {/* <div>
                        {place?.videoUrl &&
                            <video src={(place?.videoUrl as { [key in Locale]: string })[lang]}/>
                        }
                    </div> */}
            {place?.videoUrl && (
              <iframe
                title="YouTube Video"
                width="100%"
                height="100%"
                src={'https://youtube.com/embed/' + (place?.videoUrl as { [key in Locale]: string })[lang]} // Assuming place.videoUrl is the YouTube video URL
                className="rounded-xl"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="flex flex-col gap-8">
            <h1>{remainingText}</h1>
            <Chat
              placeName={(place?.name as { [key in Locale]: string })[lang]}
            />
            <TextToSpeechButton
              text={(place?.info as { [key in Locale]: string })[lang]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
